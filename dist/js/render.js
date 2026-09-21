/* Builds the page from the global CONTENT object. Owner does not edit this file. */
(function () {
  "use strict";

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---- Lightbox (one shared overlay reused by every gallery) ---- */
  var lightbox = (function () {
    var overlay, imgEl, counterEl, prevBtn, nextBtn;
    var photos = [], index = 0, lastFocus = null;

    function build() {
      overlay = el("div", "lightbox");
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Photo viewer");

      var closeBtn = el("button", "lb-close", "&times;");
      closeBtn.setAttribute("type", "button");
      closeBtn.setAttribute("aria-label", "Close");
      closeBtn.addEventListener("click", function (e) { e.stopPropagation(); close(); });

      prevBtn = el("button", "lb-nav lb-prev", "&#10094;");
      prevBtn.setAttribute("type", "button");
      prevBtn.setAttribute("aria-label", "Previous photo");
      prevBtn.addEventListener("click", function (e) { e.stopPropagation(); step(-1); });

      nextBtn = el("button", "lb-nav lb-next", "&#10095;");
      nextBtn.setAttribute("type", "button");
      nextBtn.setAttribute("aria-label", "Next photo");
      nextBtn.addEventListener("click", function (e) { e.stopPropagation(); step(1); });

      imgEl = el("img", "lb-img");
      imgEl.addEventListener("click", function (e) { e.stopPropagation(); });

      counterEl = el("div", "lb-counter");

      var stage = el("div", "lb-stage");
      stage.appendChild(imgEl);
      stage.appendChild(counterEl);

      overlay.appendChild(closeBtn);
      overlay.appendChild(prevBtn);
      overlay.appendChild(stage);
      overlay.appendChild(nextBtn);
      overlay.addEventListener("click", close); // click backdrop to close
      document.body.appendChild(overlay);
    }

    function draw() {
      imgEl.setAttribute("src", photos[index]);
      imgEl.setAttribute("alt", "Photo " + (index + 1) + " of " + photos.length);
      counterEl.textContent = (index + 1) + " / " + photos.length;
      var multi = photos.length > 1;
      prevBtn.style.display = multi ? "" : "none";
      nextBtn.style.display = multi ? "" : "none";
      counterEl.style.display = multi ? "" : "none";
    }

    function step(delta) {
      index = (index + delta + photos.length) % photos.length;
      draw();
    }

    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    }

    function open(list, startIndex) {
      if (!list || !list.length) return;
      if (!overlay) build();
      photos = list;
      index = startIndex || 0;
      lastFocus = document.activeElement;
      draw();
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
    }

    function close() {
      if (!overlay) return;
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    return { open: open };
  })();

  /* ---- Hero ---- */
  function renderHero() {
    var host = document.getElementById("hero");
    if (!host) return;
    var p = CONTENT.profile || {};
    if (p.heroPhoto) {
      host.classList.add("has-photo");
      host.style.backgroundImage =
        "linear-gradient(rgba(15,32,30,.45),rgba(15,32,30,.45)), url('" + p.heroPhoto + "')";
    }
    host.appendChild(el("div", "eyebrow", "Emcee &middot; Voice &middot; Mridangam Artist"));
    host.appendChild(el("h1", null, escapeHtml(p.name || "")));
    if (p.tagline) host.appendChild(el("p", "tagline", escapeHtml(p.tagline)));
    var links = el("div", "hero-links");
    links.appendChild(el("a", "btn", "See Events")).setAttribute("href", "#events");
    links.appendChild(el("a", "btn ghost", "Book Me")).setAttribute("href", "#contact");
    host.appendChild(links);
  }

  /* ---- About ---- */
  function renderAbout() {
    var host = document.getElementById("about");
    if (!host) return;
    host.appendChild(el("h2", null, "About"));
    if (CONTENT.aboutBanner) {
      var banner = el("img", "about-banner");
      banner.setAttribute("src", CONTENT.aboutBanner);
      banner.setAttribute("alt", "S.J. Prashanth on stage");
      banner.setAttribute("loading", "lazy");
      host.appendChild(banner);
    }
    var text = CONTENT.about || "";
    text.split(/\n\n+/).forEach(function (para) {
      if (para.trim()) host.appendChild(el("p", null, escapeHtml(para.trim())));
    });
  }

  /* ---- Video embedding (lazy) ---- */
  function embedSrc(video) {
    if (!video) return null;
    if (video.type === "youtube" && video.id) {
      return "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(video.id) + "?autoplay=1";
    }
    if (video.type === "vimeo" && video.id) {
      return "https://player.vimeo.com/video/" + encodeURIComponent(video.id) + "?autoplay=1";
    }
    if (video.type === "facebook" && video.url) {
      return "https://www.facebook.com/plugins/video.php?show_text=false&autoplay=true&href=" +
        encodeURIComponent(video.url);
    }
    return null;
  }

  function makeVideo(video) {
    var wrap = el("div", "video");

    // Self-hosted video file (e.g. an mp4 in the event's videos/ folder).
    if (video && (video.type === "file" || video.type === "local") && (video.src || video.file)) {
      var fileSrc = video.src || video.file;
      var filePoster = el("button", "video-poster",
        "<span class='play'>&#9654;</span><span class='label'>Play Video</span>");
      filePoster.setAttribute("type", "button");
      filePoster.setAttribute("aria-label", "Play video");
      filePoster.addEventListener("click", function () {
        var v = document.createElement("video");
        v.setAttribute("src", fileSrc);
        v.setAttribute("controls", "");
        v.setAttribute("autoplay", "");
        v.setAttribute("playsinline", "");
        v.setAttribute("preload", "metadata");
        wrap.innerHTML = "";
        wrap.appendChild(v);
      });
      wrap.appendChild(filePoster);
      return wrap;
    }

    var src = embedSrc(video);
    if (!src) {
      wrap.appendChild(el("div", "video-poster", "<span class='label'>Unsupported video</span>"));
      return wrap;
    }
    var labelText = (video.type || "video").toUpperCase();
    var poster = el("button", "video-poster",
      "<span class='play'>&#9654;</span><span class='label'>Play " + escapeHtml(labelText) + "</span>");
    poster.setAttribute("type", "button");
    poster.setAttribute("aria-label", "Play " + labelText + " video");
    poster.addEventListener("click", function () {
      var iframe = el("iframe");
      iframe.setAttribute("src", src);
      iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("loading", "lazy");
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
    });
    wrap.appendChild(poster);
    return wrap;
  }

  /* ---- Events ---- */
  function makeEventCard(ev) {
    var card = el("article", "event");
    card.appendChild(el("h3", null, escapeHtml(ev.title || "")));
    var metaBits = [ev.date, ev.venue].filter(Boolean).map(escapeHtml).join(" &middot; ");
    if (metaBits) card.appendChild(el("div", "meta", metaBits));
    if (ev.description) card.appendChild(el("p", "desc", escapeHtml(ev.description)));

    if (ev.photos && ev.photos.length) {
      var gallery = el("div", "gallery");
      var eventPhotos = ev.photos;
      eventPhotos.forEach(function (src, i) {
        var img = el("img");
        img.setAttribute("src", src);
        img.setAttribute("alt", escapeHtml((ev.title || "Event") + " photo " + (i + 1)));
        img.setAttribute("loading", "lazy");
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.addEventListener("click", function () { lightbox.open(eventPhotos, i); });
        img.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); lightbox.open(eventPhotos, i); }
        });
        gallery.appendChild(img);
      });
      card.appendChild(gallery);
    }

    if (ev.videos && ev.videos.length) {
      var vids = el("div", "videos");
      ev.videos.forEach(function (v) { vids.appendChild(makeVideo(v)); });
      card.appendChild(vids);
    }

    if (ev.audio && ev.audio.length) {
      ev.audio.forEach(function (item) { card.appendChild(makeTrack(item)); });
    }
    return card;
  }

  function renderEvents() {
    var host = document.getElementById("events");
    if (!host) return;
    host.appendChild(el("h2", null, "Events"));

    // Prefer eventTabs; fall back to a single tab if only a flat events[] is present.
    var tabs = CONTENT.eventTabs;
    if (!tabs && CONTENT.events) tabs = [{ label: "Events", events: CONTENT.events }];
    tabs = tabs || [];
    if (!tabs.length) {
      host.appendChild(el("p", "empty-note", "Events coming soon."));
      return;
    }

    var tablist = el("div", "tabs");
    tablist.setAttribute("role", "tablist");
    var panels = el("div", "tab-panels");

    tabs.forEach(function (tab, ti) {
      var tabId = "evtab-" + ti, panelId = "evpanel-" + ti;
      var active = ti === 0;

      var btn = el("button", "tab" + (active ? " active" : ""), escapeHtml(tab.label || ("Tab " + (ti + 1))));
      btn.setAttribute("type", "button");
      btn.setAttribute("role", "tab");
      btn.setAttribute("id", tabId);
      btn.setAttribute("aria-controls", panelId);
      btn.setAttribute("aria-selected", active ? "true" : "false");

      var panel = el("div", "tab-panel" + (active ? " active" : ""));
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("id", panelId);
      panel.setAttribute("aria-labelledby", tabId);
      panel.hidden = !active;

      var evs = tab.events || [];
      if (!evs.length) panel.appendChild(el("p", "empty-note", "More events coming soon."));
      else evs.forEach(function (ev) { panel.appendChild(makeEventCard(ev)); });

      btn.addEventListener("click", function () {
        [].forEach.call(tablist.children, function (b) {
          b.classList.remove("active"); b.setAttribute("aria-selected", "false");
        });
        [].forEach.call(panels.children, function (p) {
          p.classList.remove("active"); p.hidden = true;
        });
        btn.classList.add("active"); btn.setAttribute("aria-selected", "true");
        panel.classList.add("active"); panel.hidden = false;
      });

      tablist.appendChild(btn);
      panels.appendChild(panel);
    });

    host.appendChild(tablist);
    host.appendChild(panels);
  }

  /* ---- Audio player ---- */
  function fmtTime(sec) {
    if (!isFinite(sec)) return "0:00";
    var m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  function makeTrack(item) {
    var row = el("div", "track");
    var audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.src = item.file;

    var btn = el("button", "play-btn", "&#9654;");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-label", "Play " + (item.title || "track"));

    var main = el("div", "track-main");
    main.appendChild(el("div", "title", escapeHtml(item.title || "Untitled")));
    var bar = el("div", "bar");
    var fill = el("div", "fill");
    bar.appendChild(fill);
    main.appendChild(bar);

    var time = el("div", "time", "0:00");

    btn.addEventListener("click", function () {
      if (audio.paused) { audio.play(); btn.innerHTML = "&#10073;&#10073;"; }
      else { audio.pause(); btn.innerHTML = "&#9654;"; }
    });
    audio.addEventListener("timeupdate", function () {
      var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      fill.style.width = pct + "%";
      time.textContent = fmtTime(audio.currentTime);
    });
    audio.addEventListener("loadedmetadata", function () { time.textContent = fmtTime(audio.duration); });
    audio.addEventListener("ended", function () { btn.innerHTML = "&#9654;"; fill.style.width = "0%"; });
    bar.addEventListener("click", function (e) {
      var rect = bar.getBoundingClientRect();
      var ratio = (e.clientX - rect.left) / rect.width;
      if (audio.duration) audio.currentTime = ratio * audio.duration;
    });

    row.appendChild(btn);
    row.appendChild(main);
    row.appendChild(time);
    row.appendChild(audio);
    return row;
  }

  function renderAudio() {
    var host = document.getElementById("audio");
    if (!host) return;
    host.appendChild(el("h2", null, "Voice & Recordings"));
    var list = CONTENT.audio || [];
    if (!list.length) {
      host.appendChild(el("p", "empty-note", "Audio recordings coming soon."));
      return;
    }
    list.forEach(function (item) { host.appendChild(makeTrack(item)); });
  }

  /* ---- Contact ---- */
  function renderContact() {
    var host = document.getElementById("contact");
    if (!host) return;
    var c = CONTENT.contact || {};
    host.appendChild(el("h2", null, "Contact & Booking"));
    var links = el("div", "links");
    if (c.email) {
      var em = el("a", "btn", "Email " + escapeHtml(c.email));
      em.setAttribute("href", "mailto:" + c.email);
      links.appendChild(em);
    }
    if (c.whatsapp) {
      var num = c.whatsapp.replace(/[^\d]/g, "");
      var href = "https://wa.me/" + num + (c.whatsappText ? "?text=" + encodeURIComponent(c.whatsappText) : "");
      var wa = el("a", "btn whatsapp", "Chat on WhatsApp");
      wa.setAttribute("href", href);
      wa.setAttribute("target", "_blank");
      wa.setAttribute("rel", "noopener");
      links.appendChild(wa);
    }
    if (c.phone) {
      var ph = el("a", "btn ghost", escapeHtml(c.phone));
      ph.setAttribute("href", "tel:" + c.phone.replace(/[^+\d]/g, ""));
      links.appendChild(ph);
    }
    (c.social || []).forEach(function (s) {
      var a = el("a", "btn ghost", escapeHtml(s.label || s.url));
      a.setAttribute("href", s.url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
      links.appendChild(a);
    });
    host.appendChild(links);

    renderContactForm(host, c.form);
  }

  var _recaptchaWidgetId = null;

  function loadRecaptcha(onReady) {
    if (window.grecaptcha && window.grecaptcha.render) { onReady(); return; }
    window.__recaptchaOnload = onReady;
    if (!document.getElementById("recaptcha-api")) {
      var s = document.createElement("script");
      s.id = "recaptcha-api";
      s.src = "https://www.google.com/recaptcha/api.js?onload=__recaptchaOnload&render=explicit";
      s.async = true; s.defer = true;
      document.head.appendChild(s);
    }
  }

  function renderContactForm(host, cfg) {
    if (!cfg || !cfg.formspreeEndpoint) return;

    var wrap = el("div", "contact-form-wrap");
    wrap.appendChild(el("h3", "form-heading", "Send a message"));

    var form = document.createElement("form");
    form.className = "contact-form";
    form.setAttribute("novalidate", "");

    function field(labelText, inputEl, name, required) {
      inputEl.setAttribute("name", name);
      if (required) inputEl.setAttribute("required", "");
      inputEl.id = "cf-" + name;
      var f = el("div", "field");
      var lab = el("label", null, escapeHtml(labelText) + (required ? " *" : ""));
      lab.setAttribute("for", inputEl.id);
      f.appendChild(lab);
      f.appendChild(inputEl);
      return f;
    }

    var nameI = document.createElement("input"); nameI.type = "text"; nameI.autocomplete = "name";
    var emailI = document.createElement("input"); emailI.type = "email"; emailI.autocomplete = "email";
    var subjI = document.createElement("input"); subjI.type = "text";
    var msgI = document.createElement("textarea"); msgI.rows = 5;

    form.appendChild(field("Name", nameI, "name", true));
    form.appendChild(field("Email", emailI, "email", true));
    form.appendChild(field("Subject", subjI, "subject", false));
    form.appendChild(field("Message", msgI, "message", true));

    // Honeypot (Formspree ignores submissions where _gotcha is filled)
    var hp = document.createElement("input");
    hp.type = "text"; hp.name = "_gotcha"; hp.tabIndex = -1;
    hp.setAttribute("autocomplete", "off");
    hp.style.position = "absolute"; hp.style.left = "-9999px";
    hp.setAttribute("aria-hidden", "true");
    form.appendChild(hp);

    if (cfg.recaptchaSiteKey) {
      var cField = el("div", "field");
      var cDiv = el("div"); cDiv.id = "cf-recaptcha";
      cField.appendChild(cDiv);
      form.appendChild(cField);
    }

    var submit = el("button", "btn", "Send Message");
    submit.setAttribute("type", "submit");
    form.appendChild(submit);

    var status = el("p", "form-status");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = ""; status.className = "form-status";

      if (cfg.recaptchaSiteKey && window.grecaptcha) {
        var token = grecaptcha.getResponse(_recaptchaWidgetId);
        if (!token) {
          status.textContent = "Please complete the captcha.";
          status.className = "form-status err";
          return;
        }
      }

      var orig = submit.textContent;
      submit.disabled = true; submit.textContent = "Sending…";

      fetch(cfg.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, data: data }; });
      }).then(function (r) {
        if (r.ok) {
          status.textContent = "Thank you! Your message has been sent.";
          status.className = "form-status ok";
          form.reset();
          if (cfg.recaptchaSiteKey && window.grecaptcha) grecaptcha.reset(_recaptchaWidgetId);
        } else {
          var msg = (r.data && r.data.errors)
            ? r.data.errors.map(function (x) { return x.message; }).join(", ")
            : "Something went wrong. Please try again, or email directly.";
          status.textContent = msg;
          status.className = "form-status err";
        }
      }).catch(function () {
        status.textContent = "Network error. Please try again, or email directly.";
        status.className = "form-status err";
      }).then(function () {
        submit.disabled = false; submit.textContent = orig;
      });
    });

    wrap.appendChild(form);
    host.appendChild(wrap);

    if (cfg.recaptchaSiteKey) {
      loadRecaptcha(function () {
        _recaptchaWidgetId = window.grecaptcha.render("cf-recaptcha", { sitekey: cfg.recaptchaSiteKey });
      });
    }
  }

  function renderNavWhatsApp() {
    var c = CONTENT.contact || {};
    if (!c.whatsapp) return;
    var nav = document.querySelector(".site-nav nav");
    if (!nav) return;
    var num = c.whatsapp.replace(/[^\d]/g, "");
    var href = "https://wa.me/" + num + (c.whatsappText ? "?text=" + encodeURIComponent(c.whatsappText) : "");
    var a = document.createElement("a");
    a.className = "nav-wa";
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = "Chat on WhatsApp";
    a.setAttribute("aria-label", "Chat on WhatsApp");
    a.innerHTML =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">' +
      '<path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02zM12.04 20.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/>' +
      "</svg>";
    nav.appendChild(a);
  }

  function init() {
    if (typeof CONTENT === "undefined") {
      console.error("CONTENT is not defined — check js/content.js loads before js/render.js");
      return;
    }
    renderNavWhatsApp();
    renderHero();
    renderAbout();
    renderEvents();
    renderAudio();
    renderContact();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
