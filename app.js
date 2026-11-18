/*
  Portfolio app: rendering, routing (#/project/<slug>), EN/HE (LTR/RTL), and interactions
  (cursor follower, scroll reveals, hero parallax, hover-to-play covers).
  Content lives in js/content/*.js — this file only handles layout & behaviour.
*/
(function () {
  "use strict";

  const SITE = window.SITE_CONTENT;
  const PROJECTS = window.PORTFOLIO_PROJECTS;
  // <html data-flat> = all files sit in one folder (the upload copy made by tools/export-site.ps1)
  const FLAT = document.documentElement.hasAttribute("data-flat");
  const asset = (p) => (FLAT ? p.split("/").pop() : p);
  const imgUrl = (path, ext, suffix = "") => asset(`assets/img/${path}${suffix}.${ext}`);
  const LANGS = { en: "ltr", he: "rtl" };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const mq = (q) => window.matchMedia(q).matches;
  const reduceMotion = () => mq("(prefers-reduced-motion: reduce)");
  const finePointer = () => mq("(hover: hover) and (pointer: fine)");

  const els = {
    header: $("#siteHeader"),
    menuToggle: $("#menuToggle"),
    home: $("#homeView"),
    project: $("#projectView"),
    grid: $("#projectGrid"),
  };

  /* ── Language ─────────────────────────────────────────────── */

  let lang = "en";
  try {
    const saved = localStorage.getItem("lang");
    if (saved && LANGS[saved]) lang = saved;
  } catch (e) { /* storage unavailable — keep default */ }

  const t = (key) => key.split(".").reduce((o, k) => (o ? o[k] : undefined), SITE[lang]) ?? "";
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function setLang(next, { rerender = true } = {}) {
    lang = next;
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
    const html = document.documentElement;
    html.lang = lang;
    html.dir = LANGS[lang];
    $('meta[name="description"]').setAttribute("content", t("meta.description"));
    $$("[data-lang]").forEach((b) => {
      const active = b.dataset.lang === lang;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    if (rerender) renderAll();
    else document.title = t("meta.title");
  }

  /* ── Media helpers ────────────────────────────────────────── */

  function imgTag(im, alt, { sizes = "100vw", loading = "lazy", style = "" } = {}) {
    const src = imgUrl(im.path, im.ext);
    const mdW = Math.round((im.w * 1200) / Math.max(im.w, im.h)); // -md files are max 1200px on the long side
    const srcset = im.hasMd ? `srcset="${imgUrl(im.path, im.ext, "-md")} ${mdW}w, ${src} ${im.w}w" sizes="${sizes}"` : "";
    return `<img src="${src}" ${srcset} width="${im.w}" height="${im.h}" alt="${esc(alt)}"
      loading="${loading}" decoding="async"${style ? ` style="${style}"` : ""}>`;
  }

  const altFor = (p, n) => t("project.imageAlt").replace("{name}", p.name).replace("{n}", n);

  /* ── Home ─────────────────────────────────────────────────── */

  function renderStatic() {
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });

    const lines = t("hero.headline");
    $("#heroTitle").innerHTML = lines
      .map((line, i) =>
        `<span class="hero-line" style="--i:${i}"><span>${esc(line)}${
          i === lines.length - 1 ? '<span class="dot" aria-hidden="true"></span>' : ""}</span></span>`)
      .join(" ");

    $("#heroKeywords").innerHTML = t("hero.keywords")
      .map((w) => `<span>${esc(w)}</span>`)
      .join('<span class="sep" aria-hidden="true">·</span>');

    $("#projectCount").textContent = `(${pad(PROJECTS.length)})`;

    $("#aboutBody").innerHTML = t("about.paragraphs")
      .map((p, i) => `<p class="${i === 0 ? "about-lead" : ""}">${esc(p)}</p>`)
      .join("");

    const open = document.body.classList.contains("menu-open");
    $(".visually-hidden", els.menuToggle).textContent = open ? t("nav.close") : t("nav.menu");
    $("#year").textContent = new Date().getFullYear();
    $("#cursorLabel").textContent = t("projects.view");
  }

  function coverMedia(p, i) {
    const c = p.cover;
    const style = c.position ? `object-position:${c.position}` : "";
    const still = imgTag(c, p.name, { sizes: "(min-width: 760px) 50vw, 100vw", loading: i < 2 ? "eager" : "lazy", style });
    if (!c.video) return still;
    return `<video class="card-video" muted loop playsinline preload="none"
      poster="${imgUrl(c.path, c.ext)}" ${style ? `style="${style}"` : ""}>
      <source src="${esc(asset(c.video))}" type="video/mp4"></video>`;
  }

  function renderGrid() {
    els.grid.innerHTML = PROJECTS.map((p, i) => `
      <a class="project-card reveal" href="#/project/${p.slug}" data-link data-slug="${p.slug}" data-cursor="view">
        <div class="card-media">
          ${coverMedia(p, i)}
          <div class="card-overlay" aria-hidden="true">
            <span class="card-overlay-name">${esc(p.name)}</span>
          </div>
        </div>
        <div class="card-meta">
          <span class="card-num">${pad(i + 1)}</span>
          <span class="card-name">${esc(p.name)}</span>
          <span class="card-arrow" aria-hidden="true">→</span>
        </div>
      </a>`).join("");
    els.grid.classList.toggle("is-odd", PROJECTS.length % 2 === 1);
    bindCardVideos();
  }

  /* ── Project page ─────────────────────────────────────────── */

  const GALLERY_SIZES = {
    full: ["100vw"],
    pair: ["(min-width: 760px) 50vw, 100vw"],
    trio: ["(min-width: 760px) 33vw, 100vw"],
    "wide-narrow": ["(min-width: 760px) 66vw, 100vw", "(min-width: 760px) 33vw, 100vw"],
    "narrow-wide": ["(min-width: 760px) 40vw, 100vw", "(min-width: 760px) 60vw, 100vw"],
    mosaic: ["(min-width: 760px) 60vw, 100vw", "(min-width: 760px) 40vw, 100vw", "(min-width: 760px) 40vw, 100vw"],
    float: ["(min-width: 760px) 60vw, 100vw"],
  };

  function galleryBlock(block, p, counter) {
    if (!block || !block.images || !block.images.length) return "";
    const sizes = GALLERY_SIZES[block.layout] || ["100vw"];
    return `<div class="gallery gallery--${block.layout} reveal">
      ${block.images.map((im, k) => `<figure class="gallery-item">
        ${imgTag(im, altFor(p, ++counter.n), { sizes: sizes[k] || sizes[0] })}
      </figure>`).join("")}
    </div>`;
  }

  function renderProject(slug) {
    const index = PROJECTS.findIndex((p) => p.slug === slug);
    if (index < 0) return false;
    const p = PROJECTS[index];
    const tx = p.text[lang] || p.text.en;
    const next = PROJECTS[(index + 1) % PROJECTS.length];
    const counter = { n: 1 };
    const heading = (key, tag = "h2") => `<${tag} class="pv-heading">${esc(t("project." + key))}</${tag}>`;

    els.project.innerHTML = `
      <div class="container pv-top">
        <a class="back-link" href="#projects" data-link data-back="${p.slug}">
          <span class="arrow" aria-hidden="true">←</span><span>${esc(t("project.back"))}</span>
        </a>
        <span class="pv-num" dir="ltr">${pad(index + 1)} / ${pad(PROJECTS.length)}</span>
      </div>

      <header class="container pv-head">
        <h1 class="pv-title" lang="en" dir="ltr">${esc(p.name)}<span class="dot" aria-hidden="true"></span></h1>
      </header>

      <div class="container">
        <figure class="pv-hero${p.hero.fit === "square" ? " pv-hero--square" : ""}">
          ${imgTag(p.hero, altFor(p, 1), { sizes: "100vw", loading: "eager" })}
        </figure>
      </div>

      <section class="container pv-block pv-overview reveal">
        ${heading("overview")}
        <p class="pv-lead">${esc(tx.overview)}</p>
      </section>

      <section class="container pv-qa" aria-label="${esc(t("project.why"))} ${esc(t("project.what"))} ${esc(t("project.how"))}">
        ${["why", "what", "how"].filter((k) => tx[k]).map((k) => `
          <div class="pv-qa-row reveal">
            <h3 class="pv-qa-q">${esc(t("project." + k))}</h3>
            <p class="pv-qa-a">${esc(tx[k])}</p>
          </div>`).join("")}
      </section>

      ${tx.concept ? `
      <section class="container pv-block pv-concept reveal">
        ${heading("concept")}
        <p>${esc(tx.concept)}</p>
      </section>` : ""}

      <div class="container pv-gallery">
        ${(p.gallery || []).map((b) => galleryBlock(b, p, counter)).join("")}
      </div>

      <nav class="pv-end" aria-label="${esc(t("project.next"))}">
        <a class="pv-next" href="#/project/${next.slug}" data-link data-cursor="view">
          <span class="container pv-next-inner">
            <span class="pv-next-label">${esc(t("project.next"))}</span>
            <span class="pv-next-name" lang="en" dir="ltr">${esc(next.name)}</span>
            <span class="arrow" aria-hidden="true">→</span>
          </span>
        </a>
        <div class="container pv-end-links">
          <a class="back-link" href="#projects" data-link data-back="${p.slug}">
            <span class="arrow" aria-hidden="true">←</span><span>${esc(t("project.back"))}</span>
          </a>
        </div>
      </nav>`;
    return true;
  }

  /* ── Routing ──────────────────────────────────────────────── */

  let currentView = null;
  let pendingCard = null;

  function scrollToId(id, smooth) {
    const behavior = smooth && !reduceMotion() ? "smooth" : "instant";
    if (!id || id === "top") { window.scrollTo({ top: 0, behavior }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  }

  function route({ smooth = false } = {}) {
    const hash = decodeURIComponent(location.hash.slice(1));
    const m = hash.match(/^\/project\/([\w-]+)/);

    if (m && renderProject(m[1])) {
      els.home.hidden = true;
      els.project.hidden = false;
      currentView = "project";
      document.body.dataset.view = "project";
      window.scrollTo({ top: 0, behavior: "instant" });
      document.title = `${PROJECTS.find((p) => p.slug === m[1]).name} — ${t("meta.title")}`;
      setActiveNav(null);
      observeReveals();
      return;
    }

    const wasProject = currentView === "project";
    els.project.hidden = true;
    els.project.innerHTML = "";
    els.home.hidden = false;
    currentView = "home";
    document.body.dataset.view = "home";
    document.title = t("meta.title");
    observeReveals();

    // Coming back from a project page: land on that project's card
    if (wasProject && pendingCard) {
      const card = $(`.project-card[data-slug="${pendingCard}"]`);
      pendingCard = null;
      if (card) {
        card.classList.add("is-visible");
        card.scrollIntoView({ block: "center", behavior: "instant" });
        return;
      }
    }
    scrollToId(hash || "top", smooth && !wasProject);
  }

  // Soft page transition between views
  function navigate(href) {
    const toProject = href.startsWith("#/project/");
    const switching = toProject || currentView === "project";
    const go = () => {
      if (href === location.hash || (href === "#top" && !location.hash)) route({ smooth: true });
      else {
        history.pushState(null, "", href === "#top" ? location.pathname + location.search : href);
        route({ smooth: true });
      }
    };
    if (!switching || reduceMotion()) { go(); return; }
    document.body.classList.add("is-leaving");
    setTimeout(() => {
      go();
      requestAnimationFrame(() => document.body.classList.remove("is-leaving"));
    }, 260);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (a.dataset.back) pendingCard = a.dataset.back;
    closeMenu();
    navigate(a.getAttribute("href"));
  });

  window.addEventListener("popstate", () => route({ smooth: false }));

  /* ── Active nav state ─────────────────────────────────────── */

  function setActiveNav(id) {
    $$("[data-nav]").forEach((a) => a.classList.toggle("is-active", a.dataset.nav === id));
  }

  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => visible.set(en.target.id, en.isIntersecting));
      if (currentView !== "home") return;
      setActiveNav(visible.get("about") ? "about" : visible.get("projects") ? "projects" : null);
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["projects", "about"].forEach((id) => io.observe(document.getElementById(id)));
  }

  /* ── Scroll reveals ───────────────────────────────────────── */

  const revealIO = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-visible"); revealIO.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;

  function observeReveals() {
    $$(".reveal:not(.is-visible)").forEach((el) => {
      if (!revealIO || reduceMotion()) el.classList.add("is-visible");
      else revealIO.observe(el);
    });
  }

  /* ── Header, menu, language ───────────────────────────────── */

  function closeMenu() {
    document.body.classList.remove("menu-open");
    els.menuToggle.setAttribute("aria-expanded", "false");
    $(".visually-hidden", els.menuToggle).textContent = t("nav.menu");
  }

  els.menuToggle.addEventListener("click", () => {
    const open = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", open);
    els.menuToggle.setAttribute("aria-expanded", String(open));
    $(".visually-hidden", els.menuToggle).textContent = open ? t("nav.close") : t("nav.menu");
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  window.matchMedia("(min-width: 760px)").addEventListener("change", closeMenu);

  $$("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.lang === lang) return;
    setLang(b.dataset.lang);
    closeMenu();
  }));

  /* ── Scroll-driven effects: header state + hero parallax ──── */

  const hero = $(".hero");
  const products = $$(".hero-product");
  let mouseX = 0, mouseY = 0, ticking = false;

  function updateMotion() {
    ticking = false;
    const y = window.scrollY;
    els.header.classList.toggle("is-scrolled", y > 8);
    if (reduceMotion() || currentView !== "home") return;
    const vh = window.innerHeight;
    if (y > vh * 1.2) return;
    const p = Math.min(1, y / vh);
    hero.style.setProperty("--scroll", p.toFixed(3));
    products.forEach((el) => {
      const d = parseFloat(el.dataset.depth) || 0;
      el.style.setProperty("--px", `${(mouseX * d).toFixed(1)}px`);
      el.style.setProperty("--py", `${(mouseY * d * 0.6 + p * Math.abs(d) * 9).toFixed(1)}px`);
    });
  }
  const requestMotion = () => { if (!ticking) { ticking = true; requestAnimationFrame(updateMotion); } };
  window.addEventListener("scroll", requestMotion, { passive: true });

  /* ── Cursor follower & mouse parallax (mouse devices) ─────── */

  const cursor = $("#cursor");
  let cx = -100, cy = -100, tx = -100, ty = -100, cursorRaf = null;

  function cursorLoop() {
    cx += (tx - cx) * 0.22;
    cy += (ty - cy) * 0.22;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    cursorRaf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(cursorLoop) : null;
  }

  function updateCursorTarget(node) {
    const target = node && node.closest ? node.closest("[data-cursor], a, button") : null;
    cursor.classList.toggle("is-view", !!(target && target.dataset.cursor === "view"));
    cursor.classList.toggle("is-link", !!(target && !target.dataset.cursor));
  }
  // Content moves under a still mouse while scrolling — re-check what's under it
  window.addEventListener("scroll", () => {
    if (document.body.classList.contains("has-cursor")) updateCursorTarget(document.elementFromPoint(tx, ty));
  }, { passive: true });

  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || !finePointer()) return;
    document.body.classList.add("has-cursor");
    tx = e.clientX; ty = e.clientY;
    if (reduceMotion()) { cx = tx; cy = ty; cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; }
    else if (!cursorRaf) cursorRaf = requestAnimationFrame(cursorLoop);
    updateCursorTarget(e.target);

    if (currentView === "home" && e.clientY < window.innerHeight * 1.1) {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
      requestMotion();
    }
  }, { passive: true });

  document.addEventListener("pointerleave", () => document.body.classList.remove("has-cursor"));
  document.documentElement.addEventListener("mouseleave", () => document.body.classList.remove("has-cursor"));

  /* ── Video covers: play on hover (mouse) / in view (touch) ── */

  let videoIO = null;
  function bindCardVideos() {
    const videos = $$(".card-video", els.grid);
    if (!videos.length) return;
    if (finePointer()) {
      videos.forEach((v) => {
        const card = v.closest(".project-card");
        card.addEventListener("mouseenter", () => { v.play().catch(() => {}); });
        card.addEventListener("mouseleave", () => { v.pause(); });
      });
    } else if ("IntersectionObserver" in window && !reduceMotion()) {
      videoIO = videoIO || new IntersectionObserver((entries) => {
        entries.forEach((en) => (en.isIntersecting ? en.target.play().catch(() => {}) : en.target.pause()));
      }, { threshold: 0.5 });
      videos.forEach((v) => videoIO.observe(v));
    }
  }

  /* ── Init ─────────────────────────────────────────────────── */

  function renderAll() {
    renderStatic();
    renderGrid();
    if (currentView === "project") {
      const y = window.scrollY;
      route();
      window.scrollTo({ top: y, behavior: "instant" }); // keep reading position when switching language
    } else {
      document.title = t("meta.title");
      observeReveals();
    }
  }

  setLang(lang, { rerender: false });
  renderStatic();
  renderGrid();
  route();
  updateMotion();
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));
})();
