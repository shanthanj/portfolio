# Maintaining the S.J. Prashanth Website — Adding Events & Media

This is a **static website** (plain HTML/CSS/JS, no backend, no build framework).
All content is driven by a single data file, **`js/content.js`**. To add or change
events, photos, videos, or audio, you edit that file and drop media into folders —
nothing else.

This guide documents exactly what to do when adding a new event, so any AI
assistant (or person) can do it consistently. Hand this file to the AI tool along
with your request.

---

## Project layout

```
profile/
├─ index.html            # Page shell + <meta> tags. Loads css + js with ?v=N cache-busting.
├─ robots.txt            # Allows all crawlers (needed for social link previews).
├─ css/styles.css        # All styling.
├─ js/
│  ├─ content.js         # ★ THE ONLY FILE YOU EDIT for content. All events live here.
│  └─ render.js          # Builds the page from content.js. Do NOT edit for content changes.
├─ media/
│  └─ <event-folder>/    # One folder per event.
│     ├─ photos/         # Event photos (JP/PNG). Referenced from content.js.
│     ├─ videos/         # Self-hosted video files (mp4), if any.
│     └─ photos/_originals/   # Auto-created backups of full-res photos (NOT deployed).
└─ dist/                 # Generated deploy bundle (see "Rebuild dist" below).
```

---

## The data model (`js/content.js`)

Events are grouped into **tabs** under `CONTENT.eventTabs`. There are currently two tabs:

- **"Emcee"** — hosting / compering / MC events.
- **"Layatharangam (Mridangam)"** — Mridangam performances.

Each tab has an `events: []` array. Each event is one object:

```js
{
  title: "Event Title",            // required. Plain text or Tamil (UTF-8 renders fine).
  date: "August 2, 2026",          // display string. "" hides the date. Used to decide order.
  venue: "Rose Theatre, Brampton", // "" hides the venue.
  description: "One paragraph...",  // "" hides it. Sentences separated by spaces = one paragraph.
  photos: [                         // paths relative to site root; [] for none
    "media/<event-folder>/photos/IMG_1.jpg",
    "media/<event-folder>/photos/IMG_2.jpg"
  ],
  videos: [                         // [] for none. See "Video formats" below.
    { type: "vimeo", id: "1215371267" }
  ],
  audio: []                         // event-specific mp3s: { title, file }. [] for none.
}
```

### Ordering rule
Events render **top to bottom in array order**. Keep each tab **newest first** —
insert a new event at the position matching its date (most recent at the top of
its tab's `events` array).

### Video formats
Put one object per video in the `videos: []` array:

| Source | Object | How to get the id/url |
|---|---|---|
| YouTube | `{ type: "youtube", id: "VIDEOID" }` | From `youtube.com/watch?v=VIDEOID` or `youtu.be/VIDEOID` (the 11-char id; drop `?si=...`). |
| Vimeo | `{ type: "vimeo", id: "NUMERICID" }` | From `vimeo.com/NUMERICID`. |
| Facebook | `{ type: "facebook", url: "FULL_VIDEO_URL" }` | Paste the full Facebook video URL. |
| Self-hosted file | `{ type: "file", src: "media/<event>/videos/clip.mp4" }` | Drop the mp4 in the event's `videos/` folder. |

Videos are click-to-play (a poster loads first; the real player loads on click).

---

## What to do when adding a new event — step by step

You will normally be given: a **photo folder name**, a **date**, a **venue**, a
**title** (or enough info to write one), **which tab**, and optionally **video links**
and a **description**. If the tab is unclear, **ask** ("Emcee or Layatharangam?").

### 1. Inspect the photo folder
List the files and check their pixel dimensions and file sizes (see the resize
script below — it reports them). Confirm the folder exists under `media/`.

### 2. Organize photos into a `photos/` subfolder
Convention is `media/<event-folder>/photos/`. If the user dropped files directly
in `media/<event-folder>/`, move them:

```bash
cd media/<event-folder> && mkdir -p photos && mv *.jpg *.jpeg *.png *.JPG *.JPEG photos/ 2>/dev/null
```

### 3. Downscale oversized photos
Web target: **max 1920px on the long side**. Anything larger than **2200px** or
**over 2MB** gets resized to 1920px at JPEG quality 85; originals are backed up to
a `_originals/` subfolder (which is never deployed).

**This is saved as `resize.py` in the project root — just run it** (requires
`pip install Pillow`):

```bash
python resize.py
```

For reference, that script does the following:

```python
# resize.py — run: python resize.py   (from the project root)
import os, glob, shutil
from PIL import Image, ImageOps
MAX_SIDE = 1920; DIM_TRIGGER = 2200; SIZE_TRIGGER = 2 * 1024 * 1024
exts = ('.jpg', '.jpeg', '.png')
count = 0
for p in glob.glob('media/*/photos/*'):
    if os.path.isdir(p) or '_originals' in p or not p.lower().endswith(exts):
        continue
    try:
        with Image.open(p) as im: w, h = im.size
    except Exception as e:
        print('skip', p, e); continue
    if max(w, h) > DIM_TRIGGER or os.path.getsize(p) > SIZE_TRIGGER:
        d = os.path.dirname(p); name = os.path.basename(p)
        bdir = os.path.join(d, '_originals'); os.makedirs(bdir, exist_ok=True)
        backup = os.path.join(bdir, name)
        if not os.path.exists(backup): shutil.copy2(p, backup)  # keep the original
        with Image.open(p) as im:
            im = ImageOps.exif_transpose(im)                    # respect photo rotation
            im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
            if p.lower().endswith('.png'):
                im.save(p, 'PNG', optimize=True)
            else:
                im.convert('RGB').save(p, 'JPEG', quality=85, optimize=True, progressive=True)
        print('resized', name, '%dx%d' % (w, h), '->', Image.open(p).size)
        count += 1
print('done; resized', count, 'file(s)')
```

This script is **idempotent** and scans ALL events — safe to run any time; it only
touches oversized files and never re-resizes an already-small image.

### 4. Add the event to `js/content.js`
Open `js/content.js`, find the correct tab in `CONTENT.eventTabs`, and insert a new
event object (schema above) at the **newest-first** position in that tab's `events`
array. List every photo path you want shown, in the order you want them.

### 5. Bump the cache-busting version
In `index.html`, the CSS/JS are loaded as `styles.css?v=N`, `content.js?v=N`,
`render.js?v=N`. **Increment `N` by 1** every time you change `content.js`,
`render.js`, or `styles.css`, so returning visitors get the update instead of a
cached copy. (Replace all occurrences, e.g. `?v=5` → `?v=6`.)

### 6. Verify locally (recommended)
Serve the folder and open it:

```bash
python -m http.server 8123    # then open http://localhost:8123
```

Check: the event appears in the right tab at the right position; the meta line
shows the date/venue; all photos load (they lazy-load as you scroll); any video
plays on click; the browser console has no errors.

### 7. Rebuild the deploy bundle (`dist/`)
`dist/` is what gets uploaded. **This is saved as `build.sh` — just run it:**

```bash
bash build.sh
```

It rebuilds `dist/` with `index.html`, `robots.txt`, `css/`, `js/`, and `media/`,
and **excludes** the `_originals/` backups, `.gitkeep` files, and all tooling/docs
(`resize.py`, `build.sh`, `ADDING_EVENTS.md`, `docs/`). It prints the file count and
warns if any `_originals` slipped in.

Sanity-check the bundle: no `_originals` folders, and (if a contact form with a
reCAPTCHA secret exists) the reCAPTCHA **secret key must NOT appear** anywhere in
`dist`.

### 8. Deploy
Upload the **contents of `dist/`** to the web server's document root (so
`index.html` is at the root), overwriting existing files. Serve over HTTPS.

---

## Titles & descriptions in Tamil

The page is UTF-8, so Tamil (or any script) renders correctly in `title` and
`description`. Keep a description as a single string; separate sentences with a
space for one flowing paragraph.

---

## Security & "do not touch" notes

- **Never put secrets in the site files.** The contact form uses Formspree +
  Google reCAPTCHA v2. Only the reCAPTCHA **site key** belongs in `content.js`
  (it is public). The **secret key** lives only in the Formspree dashboard — never
  in `content.js`, `index.html`, or anywhere in `dist/`.
- **`_originals/` folders are backups** of full-resolution photos. Keep them
  locally; never deploy them (the `dist` build already excludes them).
- **Don't edit `render.js` to add content** — it's the rendering engine. Content
  changes go in `content.js` only.
- This project intentionally has **no backend and no build step**. Don't introduce
  npm packages, bundlers, or frameworks for a content change.

---

## Quick prompt you can give another AI tool

> "Here is ADDING_EVENTS.md for my static profile site. Add a new event to the
> `<Emcee | Layatharangam>` tab. Photo folder: `media/<folder>/`. Date: `<date>`.
> Venue: `<venue>`. Title: `<title>`. Description: `<text or none>`. Video(s):
> `<links or none>`. Follow the guide: organize photos into `photos/`, downscale
> oversized images (back up originals), insert the event newest-first in
> `content.js`, bump the `?v=N` version in `index.html`, verify locally, and
> rebuild `dist/`. Do not commit to git."
