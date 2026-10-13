/*
  Ashokan portfolio
  ------------------
  Edit CONFIG to change skills, projects, gallery images, portraits, and contact links.
  Leave a URL as an empty string until you have a real one.

  Preview (video seeking needs a local server, not a file:// open):
    python -m http.server 4173
  Then visit http://localhost:4173

  The hero uses assets/hero_video_web.mp4. That is the supplied film
  assets/hero_video_clean.mp4, re-encoded with a keyframe every two frames
  so scroll can move through it. The original file had a single keyframe,
  which makes frame seeking stall. If the web file fails to load, the page
  falls back to the original.
*/

const CONFIG = {
  heroTech: ["HTML", "CSS", "JavaScript", "Angular", "Python", "Django", "REST APIs"],
  skills: [
    { label: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Angular", "Bootstrap"] },
    { label: "Backend", items: ["Python", "Django", "Django REST Framework", "REST APIs"] },
    { label: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB"] },
    { label: "Tools", items: ["Git", "GitHub", "Postman", "Swagger / OpenAPI"] },
    { label: "Creative", items: ["Photography", "Composition", "Lighting", "Visual Storytelling"] }
  ],
  projects: [
    {
      title: "Project one",
      summary: "Replace this with a real project name and description. This card is a placeholder and does not represent client work.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "",
      demo: "",
      github: ""
    },
    {
      title: "Project two",
      summary: "Add a backend or API project here when you have one to show. No repository is linked yet.",
      tech: ["Python", "Django", "REST APIs"],
      image: "",
      demo: "",
      github: ""
    },
    {
      title: "Project three",
      summary: "Use this card for another build, study, or visual project. Leave the links empty until they are real.",
      tech: ["Angular", "TypeScript"],
      image: "",
      demo: "",
      github: ""
    }
  ],
  photography: [
    { src: "", alt: "Photography placeholder 1", caption: "Add a photograph", span: "tall" },
    { src: "", alt: "Photography placeholder 2", caption: "Add a photograph", span: "" },
    { src: "", alt: "Photography placeholder 3", caption: "Add a photograph", span: "" },
    { src: "", alt: "Photography placeholder 4", caption: "Add a photograph", span: "wide" },
    { src: "", alt: "Photography placeholder 5", caption: "Add a photograph", span: "" },
    { src: "", alt: "Photography placeholder 6", caption: "Add a photograph", span: "" }
  ],
  model: [
    {
      src: "assets/stills/introduction-01.jpg",
      alt: "Ashokan in a crimson blazer in a studio with monitors and lights, a still from the introduction film",
      caption: "Still from the introduction film",
      feature: true
    },
    {
      src: "assets/stills/introduction-02.jpg",
      alt: "Ashokan standing between monitors and a camera, a still from the introduction film",
      caption: "Still from the introduction film"
    },
    {
      src: "assets/stills/introduction-03.jpg",
      alt: "Ashokan in a crimson blazer against black walls and crimson light, a still from the introduction film",
      caption: "Still from the introduction film"
    }
  ],
  contact: {
    email: "",
    github: "",
    linkedin: "",
    photography: ""
  }
};

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function safeUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.protocol === "http:" || parsed.protocol === "https:" || parsed.protocol === "mailto:") {
      return parsed.href;
    }
  } catch (error) {
    return "";
  }
  return "";
}

function placeholder(label, detail, extraClass) {
  return `<div class="ph ${extraClass || ""}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></div>`;
}

function renderHeroTech() {
  const node = document.getElementById("hero-tech");
  if (!node || !Array.isArray(CONFIG.heroTech)) return;
  node.textContent = CONFIG.heroTech.join(" · ");
}

function renderSkills() {
  const root = document.getElementById("skills-root");
  if (!root) return;
  root.replaceChildren();
  CONFIG.skills.forEach((group) => {
    const row = document.createElement("article");
    row.className = "skill-row reveal";
    const items = group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    row.innerHTML = `<h3>${escapeHtml(group.label)}</h3><ul>${items}</ul>`;
    root.appendChild(row);
  });
}

function renderProjects() {
  const root = document.getElementById("projects-root");
  if (!root) return;
  root.replaceChildren();
  CONFIG.projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = `project reveal${index % 2 ? " is-flip" : ""}`;
    const media = document.createElement("div");
    media.className = "project__media";
    const imageUrl = safeUrl(project.image);
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = project.title || "Project image";
      img.loading = "lazy";
      img.addEventListener("error", () => {
        media.innerHTML = placeholder(String(index + 1).padStart(2, "0"), "Image could not be loaded", "ph--index");
      });
      media.appendChild(img);
    } else {
      media.innerHTML = placeholder(String(index + 1).padStart(2, "0"), "Placeholder — add a project image", "ph--index");
    }

    const body = document.createElement("div");
    body.className = "project__body";
    const tech = (project.tech || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const demo = safeUrl(project.demo);
    const github = safeUrl(project.github);
    const links = [
      demo ? `<a href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer">Demo</a>` : "",
      github ? `<a href="${escapeHtml(github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""
    ].filter(Boolean);

    body.innerHTML = `
      <p class="eyebrow">Placeholder</p>
      <h3>${escapeHtml(project.title || "Untitled project")}</h3>
      <p>${escapeHtml(project.summary || "")}</p>
      <ul class="tags">${tech}</ul>
      ${links.length ? `<div class="project__links">${links.join("")}</div>` : `<p class="project__pending">Demo and GitHub links have not been added.</p>`}
    `;
    article.append(media, body);
    root.appendChild(article);
  });
}

function renderGallery() {
  const root = document.getElementById("gallery-root");
  if (!root) return;
  root.replaceChildren();
  CONFIG.photography.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `gallery__item${item.span ? ` is-${item.span}` : ""}`;
    button.dataset.index = String(index);
    const imageUrl = safeUrl(item.src);
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "";
      img.loading = "lazy";
      button.appendChild(img);
      button.setAttribute("aria-label", item.alt || item.caption || "Open photograph");
    } else {
      button.innerHTML = placeholder("Placeholder", item.caption || "Add a photograph");
      button.setAttribute("aria-label", `${item.caption || "Placeholder"}. Open preview`);
    }
    button.addEventListener("click", () => openLightbox(index));
    root.appendChild(button);
  });
}

function renderModel() {
  const root = document.getElementById("model-root");
  if (!root) return;
  const feature = CONFIG.model.find((item) => item.feature) || CONFIG.model[0];
  const rest = CONFIG.model.filter((item) => item !== feature);
  const layout = document.createElement("div");
  layout.className = "model-layout";
  layout.appendChild(modelCard(feature, true));
  const side = document.createElement("div");
  side.className = "model-side";
  rest.forEach((item) => side.appendChild(modelCard(item, false)));
  layout.appendChild(side);
  root.replaceChildren(layout);
}

function modelCard(item, feature) {
  const figure = document.createElement("figure");
  figure.className = `model-card reveal${feature ? " model-card--feature" : ""}`;
  const imageUrl = item && safeUrl(item.src);
  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = item.alt || "";
    img.width = 1600;
    img.height = 900;
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.remove();
      const shell = document.createElement("div");
      shell.className = "ph";
      shell.innerHTML = "<strong>Portrait</strong><span>Image could not be loaded</span>";
      figure.prepend(shell);
    });
    figure.appendChild(img);
  } else {
    figure.innerHTML = placeholder("Portrait", "Add a portrait");
  }
  const caption = document.createElement("figcaption");
  caption.textContent = item?.caption || "Portrait";
  figure.appendChild(caption);
  return figure;
}

function renderContact() {
  const list = document.getElementById("contact-links");
  const note = document.getElementById("form-note");
  if (!list) return;
  const email = (CONFIG.contact.email || "").trim();
  const rows = [
    { label: "Email", href: email ? `mailto:${email}` : "", value: email },
    { label: "GitHub", href: safeUrl(CONFIG.contact.github), value: CONFIG.contact.github },
    { label: "LinkedIn", href: safeUrl(CONFIG.contact.linkedin), value: CONFIG.contact.linkedin },
    { label: "Photography", href: safeUrl(CONFIG.contact.photography), value: CONFIG.contact.photography }
  ];
  list.replaceChildren();
  rows.forEach((row) => {
    const li = document.createElement("li");
    const value = row.href ? displayValue(row) : "Not added yet";
    if (row.href) {
      const anchor = document.createElement("a");
      anchor.href = row.href;
      if (!row.href.startsWith("mailto:")) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
      }
      anchor.innerHTML = `<span>${escapeHtml(row.label)}</span><small>${escapeHtml(value)}</small>`;
      li.appendChild(anchor);
    } else {
      const span = document.createElement("span");
      span.innerHTML = `<span>${escapeHtml(row.label)}</span><small>${escapeHtml(value)}</small>`;
      li.appendChild(span);
    }
    list.appendChild(li);
  });
  if (note) {
    note.textContent = email
      ? "This form has no server. Submitting opens your email app with the message ready to send. The site does not deliver or store it."
      : "Add your email address in the contact settings inside script.js. Until then, this form cannot open a draft, and nothing is sent.";
  }
}

function displayValue(row) {
  if (row.href.startsWith("mailto:")) return row.value;
  try {
    const url = new URL(row.href);
    return `${url.host}${url.pathname}`.replace(/\/$/, "");
  } catch (error) {
    return row.label;
  }
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (prefersReduced() || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });
  nodes.forEach((node) => observer.observe(node));
}

function initNav() {
  const nav = document.getElementById("site-nav");
  const toggle = nav.querySelector(".nav-toggle");
  const menu = document.getElementById("site-menu");
  const links = [...menu.querySelectorAll("a")];
  const hero = document.querySelector(".cinematic");

  function closeMenu() {
    menu.querySelector(".nav-links").classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", open ? "false" : "true");
    menu.querySelector(".nav-links").classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
    if (!open) links[0]?.focus();
  });

  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
    if (event.key !== "Tab" || toggle.getAttribute("aria-expanded") !== "true") return;
    if (window.matchMedia("(min-width: 901px)").matches) return;
    const focusable = [toggle, ...links];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  function updateNav() {
    nav.classList.toggle("is-solid", hero.getBoundingClientRect().bottom <= 72);
  }

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const current = link.getAttribute("href") === `#${entry.target.id}`;
          if (current) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    sections.forEach((section) => spy.observe(section));
  }

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
  window.addEventListener("resize", updateNav);
}

let lightboxItems = [];
let lightboxIndex = 0;

function initLightbox() {
  lightboxItems = CONFIG.photography;
  const dialog = document.getElementById("lightbox");
  if (!dialog) return;
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-prev]").addEventListener("click", () => stepLightbox(-1));
  dialog.querySelector("[data-next]").addEventListener("click", () => stepLightbox(1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") stepLightbox(-1);
    if (event.key === "ArrowRight") stepLightbox(1);
  });
  let touchX = 0;
  dialog.addEventListener("touchstart", (event) => {
    touchX = event.changedTouches[0].clientX;
  }, { passive: true });
  dialog.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchX;
    if (delta > 48) stepLightbox(-1);
    if (delta < -48) stepLightbox(1);
  }, { passive: true });
}

function openLightbox(index) {
  lightboxIndex = index;
  paintLightbox();
  const dialog = document.getElementById("lightbox");
  if (typeof dialog.showModal === "function") dialog.showModal();
}

function stepLightbox(direction) {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
  paintLightbox();
}

function paintLightbox() {
  const dialog = document.getElementById("lightbox");
  const item = lightboxItems[lightboxIndex];
  const frame = dialog.querySelector(".lightbox__frame");
  frame.replaceChildren();
  const imageUrl = item && safeUrl(item.src);
  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = item.alt || "";
    frame.appendChild(img);
  } else {
    frame.innerHTML = placeholder("Placeholder", item?.caption || "Add a photograph", "ph--large");
  }
  dialog.querySelector(".lightbox__caption").textContent = item?.caption || "";
  dialog.querySelector(".lightbox__count").textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = (CONFIG.contact.email || "").trim();
    const name = document.getElementById("contact-name").value.trim();
    const from = document.getElementById("contact-from").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    if (!name || !from || !message) {
      status.textContent = "Add your name, email, and a message before opening a draft.";
      return;
    }
    if (!email) {
      status.textContent = "No destination email is configured in script.js. Nothing was sent.";
      return;
    }
    const subject = encodeURIComponent(`Portfolio note from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${from}\n\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    status.textContent = "Your email app should open with this draft. This website does not send or store the message.";
  });
}

function bandOpacity(progress, start, end) {
  const fade = 0.04;
  if (progress < start) {
    if (start === 0) return 1;
    if (progress <= start - fade) return 0;
    return (progress - (start - fade)) / fade;
  }
  if (progress > end) {
    if (end >= 1) return 1;
    if (progress >= end + fade) return 0;
    return 1 - (progress - end) / fade;
  }
  return 1;
}

function measureProgress() {
  const hero = document.querySelector(".cinematic");
  const total = hero.offsetHeight - window.innerHeight;
  if (total <= 0) return 0;
  const scrolled = Math.min(total, Math.max(0, -hero.getBoundingClientRect().top));
  return scrolled / total;
}

function initHero() {
  const video = document.getElementById("hero-video");
  const pin = document.querySelector(".cinematic__pin");
  const scenes = [...document.querySelectorAll(".hero-scene")];
  const beats = [...document.querySelectorAll("[data-at]")];
  const note = document.getElementById("hero-note");
  const sceneNum = document.getElementById("scene-num");
  const fineQuery = window.matchMedia("(min-width: 900px) and (pointer: fine)");

  const scrub = {
    duration: 0,
    target: 0,
    requested: 0,
    seeking: false,
    ready: false,
    mode: "fine",
    threshold: 0.045,
    raf: 0,
    seekStamp: 0,
    slow: 0,
    stuck: 0,
    noop: 0,
    blobUrl: "",
    triedFallback: false
  };

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  function setThreshold() {
    if (scrub.mode === "coarse") scrub.threshold = 0.4;
    else if (scrub.mode === "off") scrub.threshold = Infinity;
    else scrub.threshold = fineQuery.matches ? 0.045 : 0.12;
  }
  setThreshold();
  fineQuery.addEventListener("change", setThreshold);

  function showNote(message) {
    note.hidden = false;
    note.textContent = message;
  }

  function hideNote() {
    note.hidden = true;
    note.textContent = "";
  }

  function enablePlaybackFallback(message) {
    if (scrub.mode === "off") return;
    scrub.mode = "off";
    scrub.seeking = false;
    setThreshold();
    video.controls = true;
    try { video.pause(); } catch (error) { /* already stopped */ }
    showNote(message);
  }

  function mediaIsSeekable() {
    try {
      return video.seekable && video.seekable.length > 0 && video.seekable.end(0) > 0.5;
    } catch (error) {
      return false;
    }
  }

  function markReady() {
    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      enablePlaybackFallback("This browser could not read the film duration. You can still use the player. Scrolling still moves the story.");
      return;
    }
    if (!mediaIsSeekable()) {
      showNote("Preparing the film so scrolling can move through it.");
      return;
    }
    scrub.duration = video.duration;
    scrub.ready = true;
    scrub.noop = 0;
    if (!prefersReduced() && scrub.mode !== "off") {
      video.controls = false;
      try { video.pause(); } catch (error) { /* ignore */ }
    }
    hideNote();
    scheduleSeek();
  }

  async function loadFilm() {
    const primary = video.dataset.src || "assets/hero_video_web.mp4";
    const fallback = video.dataset.fallback || "assets/hero_video_clean.mp4";
    const source = scrub.triedFallback ? fallback : primary;
    try {
      const response = await fetch(source);
      if (!response.ok) throw new Error("missing film");
      const blob = await response.blob();
      if (scrub.blobUrl) URL.revokeObjectURL(scrub.blobUrl);
      scrub.blobUrl = URL.createObjectURL(blob);
      video.src = scrub.blobUrl;
    } catch (error) {
      if (!scrub.triedFallback) {
        scrub.triedFallback = true;
        video.src = fallback;
      } else {
        enablePlaybackFallback("The introduction film could not be loaded. The rest of the page still works.");
      }
    }
  }

  video.addEventListener("loadedmetadata", markReady);
  video.addEventListener("canplay", () => {
    if (!scrub.ready) markReady();
  });
  video.addEventListener("error", () => {
    if (scrub.ready) return;
    if (!scrub.triedFallback) {
      scrub.triedFallback = true;
      loadFilm();
      return;
    }
    enablePlaybackFallback("The introduction film could not be loaded. The rest of the page still works.");
  });
  video.addEventListener("play", () => {
    if (scrub.mode !== "off" && !prefersReduced()) video.pause();
  });
  video.addEventListener("seeked", () => {
    const elapsed = performance.now() - scrub.seekStamp;
    const landed = Math.abs(video.currentTime - scrub.requested) <= Math.max(scrub.threshold * 3, 0.18);
    scrub.seeking = false;
    scrub.stuck = 0;
    if (!landed && scrub.requested > 0.2) {
      scrub.noop += 1;
      if (scrub.noop >= 2) {
        enablePlaybackFallback("This browser can play the film, but it cannot scrub through the frames. Use the player if you want to watch it. Scrolling still changes the story.");
        return;
      }
    } else if (landed) {
      scrub.noop = 0;
    }
    if (elapsed > 520) scrub.slow += 1;
    else scrub.slow = Math.max(0, scrub.slow - 1);
    if (scrub.slow >= 3 && scrub.mode === "fine") {
      scrub.mode = "coarse";
      setThreshold();
      showNote("Frame seeking is slow on this device, so the film steps between moments as you scroll.");
    }
    if (scrub.mode !== "off" && Math.abs(video.currentTime - scrub.target) > scrub.threshold) scheduleSeek();
  });

  function queueSeek() {
    if (!scrub.ready || scrub.mode === "off" || prefersReduced()) return false;
    if (document.hidden) return false;
    if (scrub.seeking) {
      if (performance.now() - scrub.seekStamp > 1600) {
        scrub.seeking = false;
        scrub.stuck += 1;
        if (scrub.stuck >= 2) {
          enablePlaybackFallback("This browser is having trouble seeking through the film. Use the player if you want to watch it. Scrolling still changes the story.");
          return false;
        }
      }
      return true;
    }
    if (Math.abs(video.currentTime - scrub.target) < scrub.threshold) return false;
    const next = Math.min(Math.max(scrub.target, 0), Math.max(scrub.duration - 0.04, 0));
    scrub.seeking = true;
    scrub.requested = next;
    scrub.seekStamp = performance.now();
    try {
      video.currentTime = next;
    } catch (error) {
      scrub.seeking = false;
      enablePlaybackFallback("This browser blocked film seeking. Use the player if you want to watch it. Scrolling still changes the story.");
      return false;
    }
    return true;
  }

  function scheduleSeek() {
    if (scrub.raf) return;
    scrub.raf = requestAnimationFrame(() => {
      scrub.raf = 0;
      if (queueSeek()) scheduleSeek();
    });
  }

  function applyProgress(progress) {
    const clamped = Math.min(1, Math.max(0, progress || 0));
    pin.style.setProperty("--p", clamped.toFixed(4));
    pin.classList.toggle("is-intro", clamped < 0.12);

    if (scrub.ready && scrub.mode !== "off" && !prefersReduced()) {
      const end = Math.max(scrub.duration - 0.04, 0);
      scrub.target = clamped >= 0.995 ? end : clamped * end;
      scheduleSeek();
    }

    let best = clamped >= 0.75 ? 5 : 1;
    let bestOpacity = 0.03;
    const shift = !prefersReduced() && window.matchMedia("(min-width: 800px)").matches;
    scenes.forEach((scene, index) => {
      const start = Number(scene.dataset.start);
      const end = Number(scene.dataset.end);
      let opacity = bandOpacity(clamped, start, end);
      if (scene.dataset.scene === "signature" && clamped > 0.94) {
        opacity *= Math.max(0, 1 - (clamped - 0.94) / 0.06);
      }
      scene.style.opacity = opacity.toFixed(3);
      scene.style.visibility = opacity > 0.02 ? "visible" : "hidden";
      const active = opacity > 0.5;
      scene.classList.toggle("is-active", active);
      scene.setAttribute("aria-hidden", active ? "false" : "true");
      if (opacity > bestOpacity) {
        bestOpacity = opacity;
        best = Number(scene.dataset.n) || index + 1;
      }
      const copy = scene.querySelector(".hero-copy");
      if (copy && shift) {
        const local = (clamped - start) / Math.max(end - start, 0.001);
        copy.style.transform = opacity > 0.02 ? `translate3d(0, ${((0.5 - local) * 16).toFixed(2)}px, 0)` : "";
      }
    });

    const label = String(best).padStart(2, "0");
    if (sceneNum.textContent !== label) sceneNum.textContent = label;

    let side = "left";
    if (clamped >= 0.35 && clamped < 0.55) side = "right";
    else if (clamped >= 0.75 && clamped < 0.96) side = "bottom";
    else if (clamped >= 0.96) side = "none";
    if (pin.dataset.side !== side) pin.dataset.side = side;

    beats.forEach((beat) => {
      beat.classList.toggle("is-on", clamped >= Number(beat.dataset.at));
    });
  }

  function staticHero() {
    video.controls = true;
    try { video.pause(); } catch (error) { /* ignore */ }
    scenes.forEach((scene) => {
      scene.classList.add("is-active");
      scene.style.opacity = "1";
      scene.style.visibility = "visible";
      scene.setAttribute("aria-hidden", "false");
    });
    beats.forEach((beat) => beat.classList.add("is-on"));
    pin.dataset.side = "none";
    sceneNum.textContent = "01";
  }

  loadFilm();

  window.setTimeout(() => {
    if (!scrub.ready && !video.error) {
      showNote("The film is still loading. Scrolling continues the story.");
    }
  }, 4500);

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    const mm = window.gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      staticHero();
    });
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const trigger = window.ScrollTrigger.create({
        trigger: ".cinematic",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => applyProgress(self.progress),
        onRefresh: (self) => applyProgress(self.progress)
      });
      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => window.ScrollTrigger.refresh(), 150);
      };
      window.addEventListener("resize", onResize);
      applyProgress(trigger.progress || 0);
      return () => {
        window.removeEventListener("resize", onResize);
        window.clearTimeout(resizeTimer);
        if (scrub.raf) cancelAnimationFrame(scrub.raf);
        scrub.raf = 0;
        trigger.kill();
      };
    });
  } else if (prefersReduced()) {
    staticHero();
  } else {
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        applyProgress(measureProgress());
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && scrub.ready && scrub.mode !== "off") scheduleSeek();
  });

  window.addEventListener("pagehide", () => {
    if (scrub.raf) cancelAnimationFrame(scrub.raf);
  });
}

renderHeroTech();
renderSkills();
renderProjects();
renderGallery();
renderModel();
renderContact();
initNav();
initLightbox();
initContactForm();
initReveals();
initHero();
