#!/usr/bin/env python3
"""
Downscale oversized event photos for the web.

Run from the project root:   python resize.py

Rules (idempotent — safe to run any time; scans every event):
  - Only touches images whose long side > 2200px OR file size > 2MB.
  - Resizes them to max 1920px on the long side, JPEG quality 85.
  - Respects EXIF orientation (rotated phone photos stay upright).
  - Backs up each original to a sibling `_originals/` folder before overwriting.
    `_originals/` is never deployed (the dist build excludes it).

Requires Pillow:   pip install Pillow
"""
import os
import glob
import shutil
from PIL import Image, ImageOps

MAX_SIDE = 1920          # target long side after resize
DIM_TRIGGER = 2200       # resize if long side exceeds this
SIZE_TRIGGER = 2 * 1024 * 1024   # ...or if file is larger than 2MB
EXTS = ('.jpg', '.jpeg', '.png')


def main():
    count = 0
    for p in glob.glob('media/*/photos/*'):
        if os.path.isdir(p) or '_originals' in p or not p.lower().endswith(EXTS):
            continue
        try:
            with Image.open(p) as im:
                w, h = im.size
        except Exception as e:
            print('skip (cannot open)', p, e)
            continue
        if max(w, h) > DIM_TRIGGER or os.path.getsize(p) > SIZE_TRIGGER:
            d = os.path.dirname(p)
            name = os.path.basename(p)
            bdir = os.path.join(d, '_originals')
            os.makedirs(bdir, exist_ok=True)
            backup = os.path.join(bdir, name)
            if not os.path.exists(backup):
                shutil.copy2(p, backup)   # preserve the full-res original
            with Image.open(p) as im:
                im = ImageOps.exif_transpose(im)
                im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
                if p.lower().endswith('.png'):
                    im.save(p, 'PNG', optimize=True)
                else:
                    im.convert('RGB').save(p, 'JPEG', quality=85, optimize=True, progressive=True)
            newsize = os.path.getsize(p) / 1024
            print('resized %-40s %dx%d -> %dx%d  %.0fKB' %
                  (name, w, h, Image.open(p).size[0], Image.open(p).size[1], newsize))
            count += 1
    print('done; resized %d file(s)' % count)


if __name__ == '__main__':
    main()
