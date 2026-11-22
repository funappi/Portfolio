/* Portfolio Funappi : intro, grille, univers des applis, transitions de mise au point. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const D = document.documentElement;
  const { APPS, UI, MEDIA, PILLS, PLATFORMS, SITE } = window;
  const N = APPS.length;
  const state = { lang: D.lang === "en" ? "en" : "fr", current: null, busy: false, sort: { key: "pick", rev: false } };
  try { const sv = JSON.parse(localStorage.getItem("sort")); if (sv && sv.key) state.sort = sv; } catch (e) {}
  /* Ordre des applis selon le tri choisi (sert aussi pour appli suivante / précédente) */
  function seq() {
    const { key, rev } = state.sort;
    if (key === "pick") return APPS.slice();
    const v = (a) => (key === "start" ? Date.parse(a.start) : a[key]);
    const out = APPS.slice().sort((a, b) => v(b) - v(a) || APPS.indexOf(a) - APPS.indexOf(b));
    return rev ? out.reverse() : out;
  }
  const pos = (id) => seq().findIndex((a) => a.id === id);
  const t = (k) => UI[state.lang][k];
  const L = (o) => (o ? o[state.lang] || o.fr : "");
  const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const isMax = () => D.dataset.fx === "max";
  const idx = (id) => APPS.findIndex((a) => a.id === id);
  const hasVideo = (a) => a.media !== "none" && MEDIA[a.id] && MEDIA[a.id].video;
  const src = (a, f) => `media/${a.id}/${f}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const home = $("#home"), grid = $("#grid"), uni = $("#universe"), veil = $("#veil");
  const HOME_COLORS = ["#07080f", "#ff7a1a", "#e040fb", "#2f6bff", "#ffd21f", "#ff4d6d", "#8b7cf6", "#22c55e", "#2dd4bf"];
  const ICONS = {
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    gh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>'
  };

  /* ---------- Couleurs ---------- */
  function setVars(c) { ["--c0", "--c1", "--c2", "--c3"].forEach((v, i) => D.style.setProperty(v, c[i])); }
  function homeLook(focus = 0.35) { setVars(["#07080f", "#ff7a1a", "#8b7cf6", "#38e0a4"]); Bokeh.setPalette(HOME_COLORS, focus); }

  /* ---------- Textes ---------- */
  function applyI18n() {
    D.lang = state.lang;
    $$("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
    const lb = $("#langBtn");
    lb.textContent = state.lang === "fr" ? "EN" : "FR";
    lb.setAttribute("aria-label", t("lang"));
    $("#fxState").textContent = isMax() ? t("max") : t("lite");
    $("#fxBtn").setAttribute("aria-pressed", String(isMax()));
  }

  function splitWord(el, word) {
    el.innerHTML = [...word].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join("");
  }

  /* ---------- Grille d'accueil ---------- */
  function metricLabel(a) {
    const k = state.sort.key;
    if (k === "start") return new Date(a.start).toLocaleDateString(state.lang === "fr" ? "fr-FR" : "en-GB", { month: "short", year: "numeric" });
    if (k === "effort" || k === "useful") return `${t("metric")[k]} ${a[k]}/10`;
    return "";
  }

  function renderSorts() {
    const box = $("#sorts");
    box.setAttribute("aria-label", t("sortBy"));
    const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';
    box.innerHTML = Object.keys(t("sorts")).map((k) => {
      const on = state.sort.key === k, rev = on && state.sort.rev;
      return `<button class="sort-btn ${rev ? "rev" : ""}" type="button" data-sort="${k}" aria-pressed="${on}" ${on && k !== "pick" ? `title="${esc(t("flip"))}"` : ""}>${t("sorts")[k][rev ? 1 : 0]}${on && k !== "pick" ? arrow : ""}</button>`;
    }).join("");
    $$(".sort-btn", box).forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.sort;
      state.sort = state.sort.key === k && k !== "pick" ? { key: k, rev: !state.sort.rev } : { key: k, rev: false };
      store("sort", JSON.stringify(state.sort));
      renderSorts();
      const before = {};
      $$(".tile", grid).forEach((tl) => (before[tl.dataset.id] = tl.getBoundingClientRect()));
      renderGrid();
      if (reduced) return;
      $$(".tile", grid).forEach((tl, i) => {
        const a = before[tl.dataset.id], r = tl.getBoundingClientRect();
        if (!a) return;
        tl.animate([
          { transform: `translate(${a.left - r.left}px, ${a.top - r.top}px) scale(${a.width / r.width}, ${a.height / r.height})`, filter: "blur(6px)", transformOrigin: "0 0" },
          { transform: "none", filter: "blur(0)", transformOrigin: "0 0" }
        ], { duration: 650 + i * 25, easing: "cubic-bezier(.22,1,.36,1)" });
      });
    }));
  }

  function renderGrid() {
    grid.innerHTML = seq().map((a) => {
      const media = hasVideo(a)
        ? `<div class="tile-media"><img src="${src(a, "poster.jpg")}" alt="" loading="lazy" decoding="async"></div>`
        : `<div class="tile-soon"><img src="${src(a, "icon.svg")}" alt=""></div>`;
      const status = a.status === "wip" ? `<span class="tile-status">${t("status").wip}</span>` : "";
      return `<a class="tile ${a.size}" href="#${a.id}" data-id="${a.id}" data-cursor="${esc(t("enter"))}"
        style="--tc0:${a.colors[0]};--tc1:${a.colors[1]};--tc2:${a.colors[2]}" aria-label="${esc(a.name + ", " + L(a.tagline))}">
        ${media}<div class="tile-spot"></div>${status}${metricLabel(a) ? `<span class="tile-metric">${esc(metricLabel(a))}</span>` : ""}
        <div class="tile-body"><img class="tile-icon" src="${src(a, "icon.svg")}" alt="">
          <div class="tile-txt"><h2 class="tile-name">${esc(a.name)}</h2><p class="tile-tag">${esc(L(a.tagline))}</p></div></div>
      </a>`;
    }).join("");

    $$(".tile", grid).forEach((tile) => {
      const a = APPS[idx(tile.dataset.id)];
      tile.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        pending.from = tile;
        location.hash = "#" + a.id;
      });
      tile.addEventListener("pointerenter", () => {
        if (!isMax() || state.current) return;
        Bokeh.setPalette(a.colors, 0.45);
        if (fine && hasVideo(a)) {
          const box = $(".tile-media", tile);
          let v = $("video", box);
          if (!v) {
            v = document.createElement("video");
            Object.assign(v, { muted: true, loop: true, playsInline: true, preload: "auto" });
            v.src = src(a, "loop.mp4");
            v.style.cssText = "position:absolute;inset:0;opacity:0;transition:opacity .5s";
            box.appendChild(v);
            v.addEventListener("playing", () => (v.style.opacity = 1), { once: true });
          }
          v.play().catch(() => {});
        }
      });
      tile.addEventListener("pointerleave", () => { const v = $("video", tile); if (v) v.pause(); });
      tile.addEventListener("pointermove", (e) => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--mx", e.clientX - r.left + "px");
        tile.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
    grid.addEventListener("pointerleave", () => { if (!state.current) homeLook(); });
  }

  function renderFoot() {
    const links = [`<a href="${SITE.github}" target="_blank" rel="noopener">${ICONS.gh}GitHub</a>`];
    if (SITE.email) links.push(`<a href="mailto:${esc(SITE.email)}">${ICONS.mail}${esc(SITE.email)}</a>`);
    if (SITE.linkedin) links.push(`<a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
    $("#foot").innerHTML = `<div><h2>${t("contact")}</h2><p>${t("contactLine")}</p><div class="foot-links">${links.join("")}</div></div>
      <a class="made" href="${SITE.github}" target="_blank" rel="noopener">${t("made")}</a>`;
  }

  /* ---------- Univers d'une appli ---------- */
  function cardSize(a) {
    const v = MEDIA[a.id] && MEDIA[a.id].video;
    const ar = v ? v[0] / v[1] : 1.6;
    return { ar, portrait: ar < 1 };
  }

  function renderUniverse(a) {
    const list = seq(), i = list.findIndex((x) => x.id === a.id), next = list[(i + 1) % N], m = MEDIA[a.id] || { shots: [] };
    const { ar, portrait } = cardSize(a);
    const nameFs = `min(260px, ${(94 / (a.name.length * 0.56)).toFixed(2)}vw)`;

    let card;
    if (hasVideo(a)) {
      card = `<video muted loop playsinline autoplay preload="auto" poster="${src(a, "poster.jpg")}" src="${src(a, "loop.mp4")}" aria-label="${esc(a.name)}"></video>
        <span class="card-glare"></span>
        ${a.media === "preview" ? `<span class="card-note">${t("preview")}</span>` : ""}
        <span class="card-play">${ICONS.play}${t("demo")}</span>`;
    } else {
      card = `<div class="card-soon"><img src="${src(a, "icon.svg")}" alt=""><span>${t("soonVideo")}</span></div><span class="card-glare"></span>`;
    }

    const floats = (a.floats || []).slice(0, 4).map((n, k) => {
      const s = m.shots[n - 1]; if (!s) return "";
      const far = k === 1 || k === 2;
      return `<button class="float s${k} ${far ? "far" : ""} ${s[2] > s[1] ? "portrait" : ""}" type="button" data-shot="${n - 1}" data-depth="${far ? 10 : 26}" data-cursor="${esc(t("gallery"))}">
        <img src="${src(a, "shots/" + s[0])}" alt="" loading="lazy" decoding="async"></button>`;
    }).join("");

    const chips = [
      `<span class="chip status ${a.status}">${t("status")[a.status]}</span>`,
      ...a.platforms.map((p) => `<span class="chip">${L(PLATFORMS[p])}</span>`),
      ...a.pills.map((p) => `<span class="chip feat">${L(PILLS[p])}</span>`)
    ].join("");

    const actions = [];
    if (a.live) actions.push(`<a class="btn primary" href="${a.live}" target="_blank" rel="noopener">${t("open")}${ICONS.ext}</a>`);
    if (a.repo) actions.push(`<a class="btn" href="https://github.com/funappi/${a.repo}" target="_blank" rel="noopener">${ICONS.code}${t("code")}</a>`);
    if (hasVideo(a)) actions.push(`<button class="btn" type="button" data-demo>${ICONS.play}${t("demo")}</button>`);

    const desc = L(a.desc) || t("soonText");
    const lic = a.license ? `<p class="lic">${state.lang === "fr" ? "Licence" : "License"} ${a.license === "MIT" ? "MIT" : "PolyForm Noncommercial"}</p>` : "";
    const cols = a.challenge || a.tech.length
      ? `<section class="u-section u-cols focusable">
          ${a.challenge ? `<div class="u-challenge"><h3>${t("challenge")}</h3><p>${esc(L(a.challenge))}</p></div>` : "<div></div>"}
          ${a.tech.length ? `<div class="u-stack"><h3>${t("stack")}</h3><ul>${a.tech.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${lic}</div>` : ""}
        </section>` : "";
    const gallery = m.shots.length
      ? `<section class="u-section"><h3 class="focusable">${t("gallery")}</h3><div class="gallery">${m.shots.map((s, k) =>
          `<button class="shot focusable" type="button" data-shot="${k}" data-cursor="${esc(t("gallery"))}"><img src="${src(a, "shots/" + s[0])}" alt="${esc(a.name)} ${k + 1}" width="${s[1]}" height="${s[2]}" loading="lazy" decoding="async"></button>`).join("")}</div></section>`
      : "";

    uni.innerHTML = `
      <div class="u-hero" id="uHero">
        <h1 class="u-name" style="font-size:${nameFs}">${esc(a.name)}</h1>
        <div class="floats">${floats}</div>
        <div class="u-stage"><button class="card3d ${portrait ? "portrait" : ""}" type="button" style="--arn:${ar.toFixed(4)}" ${hasVideo(a) ? `data-demo data-cursor="${esc(t("playDemo"))}"` : ""} aria-label="${esc(hasVideo(a) ? t("demo") + " : " + a.name : a.name)}">${card}</button></div>
      </div>
      <div class="u-info">
        <h2 class="u-tag">${esc(L(a.tagline))}</h2>
        <p class="u-desc">${esc(desc)}</p>
        <div class="u-meta">${chips}</div>
        ${actions.length ? `<div class="u-actions">${actions.join("")}</div>` : ""}
      </div>
      ${cols}${gallery}
      <section class="u-next" style="--nc1:${next.colors[1]}">
        <a href="#${next.id}" data-next data-cursor="${esc(t("next"))}"><small>${t("next")}</small><strong>${esc(next.name)}</strong><span class="bar-fill"><i></i></span></a>
      </section>
      <footer class="u-foot"><span>${i + 1} / ${N}</span><a class="made" href="${SITE.github}" target="_blank" rel="noopener">${t("made")}</a></footer>`;

    $("#counter").textContent = `${i + 1} / ${N}`;
    document.title = `${a.name} | Funappi`;

    $$("[data-demo]", uni).forEach((b) => b.addEventListener("click", () => openLightbox([{ type: "video", src: src(a, "demo.mp4"), poster: src(a, "poster.jpg") }], 0)));
    const shots = m.shots.map((s) => ({ type: "img", src: src(a, "shots/" + s[0]) }));
    $$("[data-shot]", uni).forEach((b) => b.addEventListener("click", () => openLightbox(shots, +b.dataset.shot)));
    $("[data-next]", uni).addEventListener("click", (e) => { e.preventDefault(); pending.dir = 1; location.hash = "#" + next.id; });

    observeFocus();
    onUniScroll();
  }

  /* Mise au point progressive des sections quand on descend */
  let io;
  function observeFocus() {
    if (io) io.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { root: uni, threshold: 0.12 });
    $$(".focusable", uni).forEach((el) => io.observe(el));
  }

  let scrollRaf = 0;
  function onUniScroll() {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = 0;
      const hero = $("#uHero", uni); if (!hero) return;
      const h = hero.offsetHeight || innerHeight;
      const p = Math.min(Math.max(uni.scrollTop / (h * 0.85), 0), 1);
      $("#bar").classList.toggle("scrolled", uni.scrollTop > 40);
      hero.style.filter = isMax() && p > 0.01 ? `blur(${(p * 14).toFixed(1)}px)` : "";
      hero.style.opacity = String(1 - p * 0.65);
      if (isMax()) Bokeh.setFocus(0.22 + p * 0.5);
      const nx = $(".u-next", uni);
      if (nx) {
        const r = nx.getBoundingClientRect();
        const vis = Math.min(Math.max((innerHeight - r.top) / (r.height * 0.8), 0), 1);
        nx.style.setProperty("--np", ((1 - vis) * 14).toFixed(1));
      }
    });
  }
  uni.addEventListener("scroll", onUniScroll, { passive: true });

  /* Continuer à descendre en bas de page = appli suivante */
  let pull = 0, pullTimer;
  function setPull(v) {
    pull = Math.max(0, v);
    const p = Math.min(pull / 420, 1);
    const nx = $(".u-next", uni); if (nx) nx.style.setProperty("--pull", p.toFixed(3));
    veil.style.opacity = p > 0 ? (p * 0.75).toFixed(3) : "";
    if (p >= 1 && !state.busy) { pull = 0; veil.style.opacity = ""; pending.dir = 1; location.hash = "#" + seq()[(pos(state.current) + 1) % N].id; }
  }
  uni.addEventListener("wheel", (e) => {
    if (state.busy) return;
    const atBottom = uni.scrollTop + uni.clientHeight >= uni.scrollHeight - 4;
    if (atBottom && e.deltaY > 0) {
      setPull(pull + Math.min(e.deltaY, 80));
      clearTimeout(pullTimer);
      pullTimer = setTimeout(function decay() { if (pull > 0) { setPull(pull - 40); pullTimer = setTimeout(decay, 30); } }, 260);
    } else if (e.deltaY < 0 && pull) setPull(0);
  }, { passive: true });

  /* Inclinaison 3D de la carte, parallaxe des captures */
  let tiltRaf = 0, lastPt = null;
  uni.addEventListener("pointermove", (e) => {
    if (!isMax() || e.pointerType !== "mouse") return;
    lastPt = e;
    if (tiltRaf) return;
    tiltRaf = requestAnimationFrame(() => {
      tiltRaf = 0;
      const card = $(".card3d", uni); if (!card) return;
      const nx = (lastPt.clientX / innerWidth) * 2 - 1, ny = (lastPt.clientY / innerHeight) * 2 - 1;
      card.style.setProperty("--ry", (nx * 9).toFixed(2) + "deg");
      card.style.setProperty("--rx", (-ny * 7).toFixed(2) + "deg");
      const r = card.getBoundingClientRect();
      card.style.setProperty("--gx", ((lastPt.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      card.style.setProperty("--gy", ((lastPt.clientY - r.top) / r.height * 100).toFixed(1) + "%");
      $$(".float", uni).forEach((f) => {
        const d = +f.dataset.depth;
        f.style.setProperty("--px", (nx * -d).toFixed(1) + "px");
        f.style.setProperty("--py", (ny * -d).toFixed(1) + "px");
      });
    });
  });

  /* Balayage sur téléphone pour changer d'appli */
  let tx = null, ty = null;
  uni.addEventListener("touchstart", (e) => { if (!$("#uHero", uni).contains(e.target)) return; tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  uni.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    tx = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ---------- Transitions ---------- */
  const pending = { from: null, dir: 0 };

  function makeFlyer(tile, a) {
    const r = tile.getBoundingClientRect();
    const el = document.createElement("div");
    el.className = "flyer";
    el.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;background:${a.colors[0]}`;
    el.innerHTML = hasVideo(a) ? `<img src="${src(a, "poster.jpg")}" alt="">` : `<div class="card-soon" style="--c0:${a.colors[0]};--c1:${a.colors[1]};--c2:${a.colors[2]}"><img src="${src(a, "icon.svg")}" alt=""></div>`;
    document.body.appendChild(el);
    return { el, r };
  }

  async function openApp(id, opts = {}) {
    state.busy = true;
    const a = APPS[idx(id)];
    const fromHome = !state.current;
    setVars(a.colors);
    Bokeh.setPalette(a.colors, 0.95);
    const anim = !reduced;
    let fly = null;
    if (anim && opts.from && fromHome) fly = makeFlyer(opts.from, a);
    veil.classList.add("on");
    if (anim) await wait(fly ? 60 : 420);

    // on monte l'univers sous le voile
    $$("video", grid).forEach((v) => v.pause());
    if (fromHome) { state.homeScroll = scrollY; home.style.visibility = "hidden"; document.body.classList.add("locked"); }
    uni.hidden = false;
    uni.scrollTop = 0;
    renderUniverse(a);
    $("#appNav").hidden = false;
    state.current = id;
    const card = $(".card3d", uni);

    if (fly) {
      card.style.visibility = "hidden";
      const r = card.getBoundingClientRect();
      const anim1 = fly.el.animate([
        { left: fly.r.left + "px", top: fly.r.top + "px", width: fly.r.width + "px", height: fly.r.height + "px", borderRadius: "22px" },
        { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderRadius: "20px" }
      ], { duration: 760, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" });
      await anim1.finished;
      card.style.visibility = "";
      veil.classList.remove("on");
      fly.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, fill: "forwards" }).finished.then(() => fly.el.remove());
    } else {
      if (anim && opts.dir) {
        card.animate([{ transform: `translateX(${opts.dir * 90}px) scale(.94)`, opacity: 0.4 }, { transform: "none", opacity: 1 }], { duration: 760, easing: "cubic-bezier(.22,1,.36,1)" });
      }
      veil.classList.remove("on");
    }
    Bokeh.setPalette(a.colors, 0.22);
    uni.focus({ preventScroll: true });
    if (anim) await wait(420);
    state.busy = false;
    syncRoute();
  }

  async function closeApp() {
    state.busy = true;
    veil.classList.add("on");
    Bokeh.setFocus(0.95);
    if (!reduced) await wait(420);
    const was = state.current;
    $$("video", uni).forEach((v) => { v.pause(); v.removeAttribute("src"); v.load(); });
    uni.hidden = true; uni.innerHTML = "";
    $("#appNav").hidden = true;
    state.current = null;
    home.style.visibility = "";
    document.body.classList.remove("locked");
    scrollTo(0, state.homeScroll || 0);
    $("#bar").classList.toggle("scrolled", scrollY > 40);
    document.title = "Funappi — portfolio";
    homeLook();
    veil.classList.remove("on");
    const tile = $(`.tile[data-id="${was}"]`, grid);
    if (tile) tile.focus({ preventScroll: true });
    if (!reduced) await wait(420);
    state.busy = false;
    syncRoute();
  }

  function go(dir) {
    if (!state.current || state.busy) return;
    pending.dir = dir;
    location.hash = "#" + seq()[(pos(state.current) + dir + N) % N].id;
  }

  function routeId() { const m = location.hash.match(/^#([\w-]+)$/); return m && idx(m[1]) >= 0 ? m[1] : null; }
  function syncRoute() {
    if (state.busy) return;
    const id = routeId();
    if (id && id !== state.current) openApp(id, { from: pending.from, dir: pending.dir });
    else if (!id && state.current) closeApp();
    pending.from = null; pending.dir = 0;
  }
  addEventListener("hashchange", syncRoute);

  /* ---------- Visionneuse ---------- */
  const lb = $("#lightbox"), stage = $("#lbStage");
  let lbItems = [], lbI = 0;
  function showLb() {
    const it = lbItems[lbI];
    stage.innerHTML = it.type === "video"
      ? `<video controls autoplay muted playsinline src="${it.src}" poster="${it.poster}"></video>`
      : `<img src="${it.src}" alt="">`;
  }
  function openLightbox(items, i) {
    lbItems = items; lbI = i;
    lb.classList.toggle("single", items.length < 2);
    showLb();
    document.body.classList.remove("has-cursor");
    $$("video", uni).forEach((v) => v.pause());
    lb.showModal();
  }
  lb.addEventListener("close", () => {
    stage.innerHTML = "";
    setupCursor();
    $$(".card3d video", uni).forEach((v) => v.play().catch(() => {}));
  });
  $("#lbClose").addEventListener("click", () => lb.close());
  $("#lbPrev").addEventListener("click", () => { lbI = (lbI - 1 + lbItems.length) % lbItems.length; showLb(); });
  $("#lbNext").addEventListener("click", () => { lbI = (lbI + 1) % lbItems.length; showLb(); });
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target === stage) lb.close(); });

  /* ---------- Clavier ---------- */
  addEventListener("keydown", (e) => {
    if (lb.open) {
      if (e.key === "ArrowLeft") $("#lbPrev").click();
      if (e.key === "ArrowRight") $("#lbNext").click();
      return;
    }
    if (!state.current || /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === "Escape") location.hash = "";
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
  $("#prevBtn").addEventListener("click", () => go(-1));
  $("#nextBtn").addEventListener("click", () => go(1));

  /* ---------- Curseur ---------- */
  const cur = $("#cursor"), curLabel = $("#cursorLabel");
  let cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy, curRaf = 0;
  function setupCursor() {
    const on = isMax() && fine && !reduced;
    document.body.classList.toggle("has-cursor", on);
    if (on && !curRaf) {
      const loop = () => {
        rx += (cx - rx) * 0.2; ry += (cy - ry) * 0.2;
        cur.style.setProperty("--x", cx + "px"); cur.style.setProperty("--y", cy + "px");
        cur.style.setProperty("--rx", rx + "px"); cur.style.setProperty("--ry", ry + "px");
        curRaf = requestAnimationFrame(loop);
      };
      loop();
    }
    if (!on && curRaf) { cancelAnimationFrame(curRaf); curRaf = 0; }
  }
  addEventListener("pointermove", (e) => { cx = e.clientX; cy = e.clientY; cur.style.opacity = 1; }, { passive: true });
  document.addEventListener("pointerleave", () => (cur.style.opacity = 0));
  document.addEventListener("pointerover", (e) => {
    const el = e.target.closest("[data-cursor], a, button");
    const label = el && el.dataset.cursor;
    cur.classList.toggle("label", !!label);
    cur.classList.toggle("hover", !!el && !label);
    if (label) curLabel.textContent = label;
  });

  /* ---------- Boutons de la barre ---------- */
  $("#langBtn").addEventListener("click", () => {
    state.lang = state.lang === "fr" ? "en" : "fr";
    store("lang", state.lang);
    applyI18n(); renderSorts(); renderGrid(); renderFoot();
    if (state.current) { const s = uni.scrollTop; renderUniverse(APPS[idx(state.current)]); uni.scrollTop = s; }
  });
  $("#fxBtn").addEventListener("click", () => {
    D.dataset.fx = isMax() ? "lite" : "max";
    store("fx", D.dataset.fx);
    Bokeh.setMode(D.dataset.fx);
    setupCursor(); applyI18n();
    if (state.current) { const c = $(".card3d", uni); if (c) { c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); } onUniScroll(); }
  });

  /* ---------- Intro ---------- */
  async function intro() {
    const box = $("#intro"), word = $("#introWord"), hero = $("#heroWord");
    let seen = false; try { seen = sessionStorage.getItem("introSeen") === "1"; } catch (e) {}
    if (seen || reduced || routeId()) return;
    try { sessionStorage.setItem("introSeen", "1"); } catch (e) {}
    splitWord(word, SITE.name);
    hero.style.opacity = 0;
    home.classList.add("intro-on");
    $$(".tile", grid).forEach((tl) => tl.classList.add("pre"));
    box.hidden = false;
    Bokeh.setFocus(1);
    let done = false, resolve;
    const finished = new Promise((r) => (resolve = r));
    const finish = async () => {
      if (done) return; done = true;
      // le mot rejoint sa place dans la page
      const span = (el) => { const r1 = el.firstElementChild.getBoundingClientRect(), r2 = el.lastElementChild.getBoundingClientRect(); return { left: r1.left, top: r1.top, w: r2.right - r1.left }; };
      const a = span(word), b = span(hero);
      const s = b.w / a.w;
      word.style.transformOrigin = "0 0";
      word.animate([{ transform: "none" }, { transform: `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${s})` }],
        { duration: 700, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" });
      Bokeh.setFocus(0.35);
      await wait(700);
      hero.style.opacity = "";
      home.classList.remove("intro-on");
      box.classList.add("out");
      $$(".tile.pre", grid).forEach((tl, i) => setTimeout(() => tl.classList.remove("pre"), 90 + i * 55));
      await wait(500);
      box.hidden = true;
      resolve();
    };
    $("#introSkip").addEventListener("click", finish);
    addEventListener("keydown", finish, { once: true });
    box.addEventListener("click", finish);
    requestAnimationFrame(() => box.classList.add("go"));
    setTimeout(finish, 2300);
    return finished;
  }

  addEventListener("scroll", () => { if (!state.current) $("#bar").classList.toggle("scrolled", scrollY > 40); }, { passive: true });

  /* ---------- Démarrage ---------- */
  Bokeh.init($("#bokeh"), $("#bokeh-lite"));
  homeLook(0.35);
  splitWord($("#heroWord"), SITE.name);
  applyI18n();
  renderSorts();
  renderGrid();
  renderFoot();
  setupCursor();
  intro();
  syncRoute();
})();
