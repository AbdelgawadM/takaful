/* ============================================================
   TAKAFUL — Shared UI runtime
   Injects chrome (header / drawer / bottom-nav / footer / search
   overlay / toasts), provides icons, card renderers, motion.
   Frontend prototype only — no backend calls.
   ============================================================ */

(function () {
  "use strict";
  const TK = window.TK;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  TK.$ = $; TK.$$ = $$;

  /* ---------------- Icons (stroke, 24px) ---------------- */
  const I = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    pin: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18"/>',
    reels: '<rect x="4" y="3" width="16" height="18" rx="4"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5z"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    home: '<path d="m4 11 8-7 8 7"/><path d="M6 9.5V20h12V9.5"/>',
    tag: '<path d="M3 12V4h8l9 9-8 8-9-9Z"/><circle cx="8" cy="9" r="1.6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2.2 2.2 0 0 0 4 0"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>',
    chevL: '<path d="m14 6-6 6 6 6"/>',
    star: '<path fill="currentColor" stroke="none" d="m12 3 2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7Z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    shield: '<path d="M12 3 5 6v5c0 5 3.2 8.2 7 10 3.8-1.8 7-5 7-10V6Z"/><path d="m9 11.5 2.2 2.2L15.5 9.5"/>',
    verified: '<path fill="currentColor" stroke="none" d="m12 2 2.4 1.8 3-.3 1.1 2.8 2.8 1.1-.3 3L23 12l-1.8 2.4.3 3-2.8 1.1-1.1 2.8-3-.3L12 23l-2.4-1.8-3 .3-1.1-2.8-2.8-1.1.3-3L1 12l1.8-2.4-.3-3 2.8-1.1L6.4 2.7l3 .3Z"/><path stroke="#fff" stroke-width="2.2" d="m8.5 12 2.4 2.4 4.6-4.8" fill="none"/>',
    direction: '<path d="m12 2 10 10-10 10L2 12Z"/><path d="M9.5 13.5v-2.2a1.3 1.3 0 0 1 1.3-1.3h3.7"/><path d="m12.7 8.2 1.8 1.8-1.8 1.8"/>',
    phone: '<path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    heart: '<path d="M12 20s-7.5-4.7-9.3-9A5.2 5.2 0 0 1 12 6.7 5.2 5.2 0 0 1 21.3 11c-1.8 4.3-9.3 9-9.3 9Z"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="m8.3 10.8 6.4-3.6M8.3 13.2l6.4 3.6"/>',
    flag: '<path d="M5 21V4"/><path d="M5 5h13l-2.5 4L18 13H5"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 15h9"/>',
    tooth: '<path d="M7 3.5C4.8 3.5 3.5 5.4 3.5 8c0 4 2 5 2.3 8.5.2 2 .8 4 2.2 4 1.8 0 1.2-4.5 4-4.5s2.2 4.5 4 4.5c1.4 0 2-2 2.2-4C18.5 13 20.5 12 20.5 8c0-2.6-1.3-4.5-3.5-4.5-2 0-2.6 1-5 1s-3-1-5-1Z"/>',
    scan: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    sparkle: '<path d="M12 4c.8 3.8 2.2 5.2 6 6-3.8.8-5.2 2.2-6 6-.8-3.8-2.2-5.2-6-6 3.8-.8 5.2-2.2 6-6Z"/><path d="M19 15c.4 1.9 1.1 2.6 3 3-1.9.4-2.6 1.1-3 3-.4-1.9-1.1-2.6-3-3 1.9-.4 2.6-1.1 3-3Z" transform="translate(-14 1)"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    baby: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5c-1.5 1-1.5 2.5 0 3.5"/><circle cx="9" cy="12" r=".8" fill="currentColor"/><circle cx="15" cy="12" r=".8" fill="currentColor"/><path d="M9.5 15.2c1.5 1.2 3.5 1.2 5 0"/>',
    pill: '<rect x="3.5" y="9" width="17" height="7" rx="3.5" transform="rotate(-40 12 12.5)"/><path d="m9.5 8.2 5 6"/>',
    stetho: '<path d="M5 3v5a5 5 0 0 0 10 0V3"/><path d="M10 13v3.5a4.5 4.5 0 0 0 9 0V14"/><circle cx="19" cy="11.5" r="2.2"/>',
    qr: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><path d="M13.5 13.5h3v3h-3zM17.5 17.5h3v3h-3z"/>',
    wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v3"/><rect x="3" y="7" width="18" height="13" rx="2.5"/><circle cx="16.5" cy="13.5" r="1.3" fill="currentColor"/>',
    save: '<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1Z"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    map: '<path d="m9 4-5 2v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.3" fill="currentColor"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor"/><circle cx="4.5" cy="18" r="1.3" fill="currentColor"/>',
    wifiOff: '<path d="m3 3 18 18"/><path d="M5 10a12 12 0 0 1 4.2-2.5M12 5c3.5 0 6.7 1.4 9 3.7"/><path d="M8.5 13.5a7 7 0 0 1 3-1.4M15.5 13.5c.7.5 1.3 1 1.8 1.7"/><circle cx="12" cy="18.5" r="1.3" fill="currentColor"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".9" fill="currentColor"/>',
    cal: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10.5h17"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2.5l2.2 11.5a1.5 1.5 0 0 0 1.5 1.2h7.8a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.4 5.8l2.1 2.1M17.5 16.1l2.1 2.1M2.5 12h3M18.5 12h3M4.4 18.2l2.1-2.1M17.5 7.9l2.1-2.1"/>',
    logout: '<path d="M14 4h-8a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8"/><path d="M10 12h10m0 0-3.5-3.5M20 12l-3.5 3.5"/>',
    play: '<path fill="currentColor" stroke="none" d="M8 5.5v13l11-6.5Z"/>',
    volume: '<path d="M4 9v6h3l5 4V5L7 9Z"/><path d="M16 9a4.5 4.5 0 0 1 0 6"/>',
    mute: '<path d="M4 9v6h3l5 4V5L7 9Z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
    doc: '<path d="M6 2.5h8L19 8v13.5H6Z"/><path d="M13.5 2.5V8H19"/><path d="M9 13h6M9 17h6"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>'
  };
  TK.icon = (name, size = 22, sw = 1.7) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || I.info}</svg>`;

  /* ---------------- Path helpers ---------------- */
  const inSub = /\/(admin|partner)\//.test(location.pathname);
  const root = inSub ? "../" : "";
  TK.root = root;
  const page = (location.pathname.split("/").pop() || "index.html");

  /* ---------------- Generative art (no stock photos) ---------------- */
  TK.art = (hue, seed = 3, light = false) => {
    const h2 = (hue + 28) % 360;
    const s = seed % 4;
    const shapes = [
      `<circle cx="82%" cy="18%" r="60" fill="hsla(${h2},55%,${light ? 88 : 30}%,.55)"/><circle cx="12%" cy="88%" r="46" fill="hsla(${hue},45%,${light ? 82 : 24}%,.5)"/>`,
      `<rect x="60%" y="-12%" width="120" height="120" rx="34" transform="rotate(18)" fill="hsla(${h2},50%,${light ? 86 : 28}%,.5)"/><circle cx="16%" cy="80%" r="52" fill="hsla(${hue},48%,${light ? 84 : 26}%,.45)"/>`,
      `<circle cx="50%" cy="115%" r="90" fill="hsla(${h2},52%,${light ? 87 : 27}%,.5)"/><circle cx="88%" cy="8%" r="38" fill="hsla(${hue},46%,${light ? 83 : 25}%,.5)"/>`,
      `<path d="M0 70 Q 80 20 160 70 T 320 70 V160 H0 Z" fill="hsla(${h2},50%,${light ? 86 : 28}%,.45)"/><circle cx="80%" cy="22%" r="40" fill="hsla(${hue},48%,${light ? 84 : 26}%,.5)"/>`
    ];
    const cross = `<g fill="hsla(${hue},30%,${light ? 40 : 92}%,.2)"><rect x="72%" y="52%" width="34" height="10" rx="4"/><rect x="72%" y="52%" width="34" height="10" rx="4" transform-origin="center" style="transform-box:fill-box;transform:rotate(90deg)"/></g>`;
    return `<svg class="sc-art" viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;background:linear-gradient(140deg,hsl(${hue},42%,${light ? 94 : 16}%),hsl(${h2},46%,${light ? 88 : 22}%))" aria-hidden="true">${shapes[s]}${cross}</svg>`;
  };

  /* Deterministic QR-looking placeholder (visual only) */
  TK.qrSvg = (seedStr = "TAKAFUL", size = 100) => {
    let h = 0;
    for (const ch of seedStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
    const n = 21, cells = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const inFinder = (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
      if (!inFinder && rnd() > .52) cells.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    }
    const finder = (fx, fy) => `<path d="M${fx} ${fy}h7v7h-7z M${fx + 1} ${fy + 1}v5h5v-5z" fill-rule="evenodd"/><rect x="${fx + 2}" y="${fy + 2}" width="3" height="3"/>`;
    return `<svg viewBox="-1 -1 23 23" width="${size}" height="${size}" fill="#0e2557" role="img" aria-label="رمز QR (نموذج عرض)"><g shape-rendering="crispEdges">${finder(0, 0)}${finder(14, 0)}${finder(0, 14)}${cells.join("")}</g></svg>`;
  };

  TK.logoBadge = (p, size = 54, radius = 16) =>
    `<span class="pc-logo" style="width:${size}px;height:${size}px;border-radius:${radius}px;background:linear-gradient(140deg,hsl(${p.hue},55%,40%),hsl(${p.hue},60%,26%))">${p.initial}</span>`;

  /* ---------------- Chrome injection ---------------- */
  const NAV = [
    { href: "index.html", label: "الرئيسية", icon: "home" },
    { href: "providers.html", label: "الأقرب", icon: "pin" },
    { href: "services.html", label: "اشترِ خدمة", icon: "cart" },
    { href: "offers.html", label: "العروض", icon: "tag" },
    { href: "reels.html", label: "Reels", icon: "reels" },
    { href: "membership.html", label: "بطاقتي", icon: "card" }
  ];
  const cur = href => (page === href || (href === "providers.html" && page === "provider.html") || (href === "services.html" && ["service.html", "checkout.html"].includes(page))) ? 'aria-current="page"' : "";

  function buildHeader() {
    if (document.body.dataset.chrome === "none") return;
    const h = document.createElement("header");
    h.className = "site-header";
    h.innerHTML = `
      <div class="container header-inner">
        <button class="icon-btn menu-btn" aria-label="القائمة" data-open-drawer>${TK.icon("menu")}</button>
        <a class="brand" href="${root}index.html" aria-label="تكافل العربية — الرئيسية">
          <img class="brand-logo" src="${root}assets/img/logo.png" alt="تكافل العربية للرعاية الصحية" style="height:46px">
        </a>
        <nav class="main-nav" aria-label="التنقل الرئيسي">
          ${NAV.map(n => `<a href="${root}${n.href}" ${cur(n.href)}>${n.label}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <button class="icon-btn" aria-label="بحث" data-open-search>${TK.icon("search")}</button>
          <button class="lang-switch" aria-label="Switch to English" data-lang>EN</button>
          <a class="btn btn-ghost header-cta-desktop" href="${root}login.html">تسجيل الدخول</a>
          <a class="btn btn-primary header-cta-desktop" href="${root}membership.html">${TK.icon("qr", 18)} بطاقتي</a>
        </div>
      </div>`;
    document.body.prepend(h);

    const onScroll = () => h.classList.toggle("scrolled", scrollY > 14);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
  }

  function buildDrawer() {
    if (document.body.dataset.chrome === "none") return;
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="drawer-scrim" data-close-drawer></div>
      <aside class="drawer" role="dialog" aria-modal="true" aria-label="قائمة التنقل">
        <div class="drawer-head">
          <a class="brand" href="${root}index.html"><img class="brand-logo" src="${root}assets/img/logo.png" alt="تكافل العربية" style="height:38px"></a>
          <button class="icon-btn" aria-label="إغلاق" data-close-drawer>${TK.icon("x")}</button>
        </div>
        <nav class="drawer-nav">
          ${NAV.map(n => `<a href="${root}${n.href}" ${cur(n.href)}>${TK.icon(n.icon, 20)}${n.label}</a>`).join("")}
          <div class="sep"></div>
          <a href="${root}search.html">${TK.icon("search", 20)}البحث</a>
          <a href="${root}account.html">${TK.icon("user", 20)}حسابي والمزيد</a>
          <a href="${root}about.html">${TK.icon("info", 20)}عن تكافل</a>
          <a href="${root}faq.html">${TK.icon("doc", 20)}الأسئلة الشائعة</a>
          <a href="${root}contact.html">${TK.icon("phone", 20)}تواصل معنا</a>
        </nav>
        <div class="drawer-foot">
          <a class="btn btn-primary btn-block" href="${root}login.html">تسجيل الدخول</a>
          <button class="btn btn-secondary btn-block" data-lang>English</button>
        </div>
      </aside>`;
    document.body.append(...wrap.children);

    const scrim = $(".drawer-scrim"), drawer = $(".drawer");
    const open = () => { scrim.classList.add("open"); drawer.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { scrim.classList.remove("open"); drawer.classList.remove("open"); document.body.style.overflow = ""; };
    document.addEventListener("click", e => {
      if (e.target.closest("[data-open-drawer]")) open();
      if (e.target.closest("[data-close-drawer]")) close();
    });
    addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  function buildBottomNav() {
    if (document.body.dataset.chrome === "none") return;
    const BN = [
      { href: "index.html", label: "الرئيسية", icon: "home" },
      { href: "providers.html", label: "الأقرب", icon: "pin" },
      { href: "reels.html", label: "Reels", icon: "reels", orb: true },
      { href: "membership.html", label: "بطاقتي", icon: "card" },
      { href: "account.html", label: "المزيد", icon: "grid" }
    ];
    const n = document.createElement("nav");
    n.className = "bottom-nav"; n.setAttribute("aria-label", "تنقل سفلي");
    n.innerHTML = `<div class="bottom-nav-inner">${BN.map(b => b.orb
      ? `<a href="${root}${b.href}" class="nav-reels" ${cur(b.href)}><span class="reels-orb">${TK.icon(b.icon, 24, 1.9)}</span><span class="visually-hidden">${b.label}</span></a>`
      : `<a href="${root}${b.href}" ${cur(b.href)}>${TK.icon(b.icon, 22)}<span>${b.label}</span></a>`).join("")}</div>`;
    document.body.append(n);
  }

  function buildFooter() {
    if (document.body.dataset.chrome === "none" || document.body.dataset.footer === "none") return;
    const f = document.createElement("footer");
    f.className = "site-footer on-dark";
    f.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            <a class="brand" href="${root}index.html"><img class="brand-logo logo-invert" src="${root}assets/img/logo.png" alt="تكافل العربية" style="height:44px;opacity:.95"></a>
            <p>بوابة وصول صحي ذكية: اعرف أين تذهب، كم ستوفر، وكيف تستخدم حقك خلال ثوانٍ.</p>
            <div class="footer-badges">
              <span class="footer-badge">${TK.icon("shield", 16)} شبكة موثقة</span>
              <span class="footer-badge">${TK.icon("check", 16)} توفير مثبت</span>
            </div>
          </div>
          <nav aria-label="المنتج"><h4>المنتج</h4>
            <ul>
              <li><a href="${root}providers.html">الشبكة الطبية</a></li>
              <li><a href="${root}services.html">اشترِ خدمة</a></li>
              <li><a href="${root}offers.html">العروض الموثقة</a></li>
              <li><a href="${root}reels.html">Reels الطبي</a></li>
              <li><a href="${root}membership.html">العضوية والبطاقة</a></li>
            </ul>
          </nav>
          <nav aria-label="الشركة"><h4>الشركة</h4>
            <ul>
              <li><a href="${root}about.html">عن تكافل</a></li>
              <li><a href="${root}partner/index.html">بوابة الشركاء</a></li>
              <li><a href="${root}admin/index.html">لوحة الإدارة</a></li>
              <li><a href="${root}states.html">مرجع حالات الواجهة</a></li>
              <li><a href="${root}contact.html">انضم كشريك</a></li>
            </ul>
          </nav>
          <nav aria-label="الدعم"><h4>الدعم</h4>
            <ul>
              <li><a href="${root}faq.html">الأسئلة الشائعة</a></li>
              <li><a href="${root}contact.html">تواصل معنا</a></li>
              <li><a href="${root}about.html#terms">الشروط والأحكام</a></li>
              <li><a href="${root}about.html#privacy">سياسة الخصوصية</a></li>
            </ul>
          </nav>
        </div>
        <div class="footer-bottom">
          <span>© 2026 تكافل العربية للرعاية الصحية — نموذج واجهة أمامية</span>
          <div class="footer-social">
            <a href="#" aria-label="X">${TK.icon("x", 16)}</a>
            <a href="#" aria-label="مشاركة">${TK.icon("share", 16)}</a>
            <a href="#" aria-label="واتساب">${TK.icon("phone", 16)}</a>
          </div>
        </div>
      </div>`;
    document.body.append(f);
  }

  /* ---------------- Search overlay ---------------- */
  function buildSearchOverlay() {
    if (document.body.dataset.chrome === "none") return;
    const o = document.createElement("div");
    o.className = "search-overlay"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "البحث");
    o.innerHTML = `
      <div class="so-inner">
        <div class="search-box">
          ${TK.icon("search", 22)}
          <input type="search" id="so-input" placeholder="ابحث عن خدمة، تخصص أو مركز…" autocomplete="off" aria-label="ابحث عن خدمة، تخصص أو مركز">
          <button class="icon-btn" aria-label="إغلاق البحث" data-close-search style="border:0;background:var(--c-surface-2)">${TK.icon("x", 20)}</button>
        </div>
        <div id="so-live">
          <div class="search-group"><h4>${TK.icon("clock", 15)} عمليات بحث سابقة</h4>
            <div class="chip-row">${TK.searchRecent.map(t => `<button class="chip" data-q="${t}">${t}</button>`).join("")}</div>
          </div>
          <div class="search-group"><h4>${TK.icon("trend", 15)} الأكثر بحثًا</h4>
            <div class="chip-row">${TK.searchPopular.map(t => `<button class="chip" data-q="${t}">${TK.icon("search", 13)} ${t}</button>`).join("")}</div>
          </div>
          <div class="search-group"><h4>${TK.icon("grid", 15)} تصفح الأقسام</h4>
            <div class="chip-row">${TK.categories.slice(0, 6).map(c => `<a class="chip" href="${root}services.html?cat=${c.id}">${c.label}</a>`).join("")}</div>
          </div>
        </div>
        <div id="so-results" class="search-group" hidden></div>
      </div>`;
    document.body.append(o);

    const input = $("#so-input", o), live = $("#so-live", o), results = $("#so-results", o);
    const open = () => { o.classList.add("open"); document.body.style.overflow = "hidden"; setTimeout(() => input.focus(), 60); };
    const close = () => { o.classList.remove("open"); document.body.style.overflow = ""; };
    document.addEventListener("click", e => {
      if (e.target.closest("[data-open-search]")) { e.preventDefault(); open(); }
      if (e.target.closest("[data-close-search]")) close();
      const chip = e.target.closest(".chip[data-q]");
      if (chip && o.contains(chip)) { input.value = chip.dataset.q; run(chip.dataset.q); }
    });
    addEventListener("keydown", e => {
      if (e.key === "Escape") close();
      if (e.key === "/" && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });

    function run(q) {
      q = q.trim();
      if (!q) { live.hidden = false; results.hidden = true; return; }
      live.hidden = true; results.hidden = false;
      const norm = s => s.replace(/[أإآ]/g, "ا").replace(/ة/g, "ه");
      const nq = norm(q);
      const provHits = TK.providers.filter(p => norm(p.name + p.specialty + p.type).includes(nq)).slice(0, 4);
      const servHits = TK.services.filter(s => norm(s.title + s.desc).includes(nq)).slice(0, 5);
      if (!provHits.length && !servHits.length) {
        results.innerHTML = `
          <div class="state-block" style="border-style:solid;border-color:var(--c-border)">
            <div class="st-icon">${TK.icon("search", 30)}</div>
            <h3>لا توجد نتائج لـ «${q}»</h3>
            <p>جرّب كلمة أعم مثل «أسنان» أو «تحاليل»، أو تصفح الأقسام مباشرة.</p>
            <div class="st-actions">
              <a class="btn btn-primary" href="${root}services.html">تصفح الخدمات</a>
              <a class="btn btn-secondary" href="${root}providers.html">الشبكة الطبية</a>
            </div>
          </div>`;
        return;
      }
      results.innerHTML = `
        ${servHits.length ? `<h4>${TK.icon("cart", 15)} خدمات</h4><div class="suggest-list">${servHits.map(s => {
          const p = TK.providers.find(x => x.id === s.providerId);
          return `<a class="suggest-item" href="${root}service.html?id=${s.id}">
            <span class="si-icon">${TK.icon("cart", 18)}</span>
            <span><span class="si-label">${s.title}</span><br><span class="si-sub">${p.name} · ${TK.sar(s.price)} ر.س</span></span></a>`;
        }).join("")}</div>` : ""}
        ${provHits.length ? `<h4 style="margin-top:20px">${TK.icon("pin", 15)} مراكز</h4><div class="suggest-list">${provHits.map(p =>
          `<a class="suggest-item" href="${root}provider.html?id=${p.id}">
            <span class="si-icon">${TK.icon("pin", 18)}</span>
            <span><span class="si-label">${p.name}</span><br><span class="si-sub">${p.specialty} · ${p.benefit.label}</span></span></a>`).join("")}</div>` : ""}`;
    }
    let t; input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => run(input.value), 160); });
  }

  /* ---------------- Toasts ---------------- */
  function buildToasts() {
    const r = document.createElement("div");
    r.className = "toast-region"; r.setAttribute("aria-live", "polite");
    document.body.append(r);
    TK.toast = (msg, kind = "success", ms = 2600) => {
      const t = document.createElement("div");
      t.className = `toast ${kind}`;
      t.innerHTML = `${TK.icon(kind === "success" ? "check" : "info", 19)}<span>${msg}</span>`;
      r.append(t);
      setTimeout(() => { t.classList.add("leaving"); setTimeout(() => t.remove(), 300); }, ms);
    };
  }

  /* ---------------- Offline bar ---------------- */
  function buildOffline() {
    const b = document.createElement("div");
    b.className = "offline-bar"; b.setAttribute("role", "status");
    b.textContent = "لا يوجد اتصال بالإنترنت — نعرض آخر بيانات محفوظة";
    document.body.append(b);
    const sync = () => b.classList.toggle("show", !navigator.onLine);
    addEventListener("online", () => { sync(); TK.toast && TK.toast("عاد الاتصال بالإنترنت"); });
    addEventListener("offline", sync); sync();
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("in");
        if (el.hasAttribute("data-stagger")) {
          [...el.children].forEach((c, i) => c.style.transitionDelay = `${Math.min(i * 70, 560)}ms`);
        }
        io.unobserve(el);
      });
    }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal, .reveal-scale, [data-stagger]").forEach(el => io.observe(el));
  }
  TK.initReveal = initReveal;

  /* ---------------- Skeleton helper ----------------
     Wraps a render fn: shows skeletons briefly (simulated load),
     then swaps in real content. Demonstrates loading states. */
  TK.withSkeleton = (container, skeletonHTML, render, delay = 650) => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { render(); initReveal(); return; }
    container.innerHTML = skeletonHTML;
    container.setAttribute("aria-busy", "true");
    setTimeout(() => { container.removeAttribute("aria-busy"); render(); initReveal(); }, delay);
  };
  TK.skelCards = (n = 4, cls = "") => Array.from({ length: n }, () =>
    `<div class="skeleton-card ${cls}"><div class="skeleton sk-media"></div><div class="skeleton sk-line w80"></div><div class="skeleton sk-line w60"></div><div class="skeleton sk-line w40"></div></div>`).join("");

  /* ---------------- Shared card renderers ---------------- */
  TK.providerCard = p => `
    <article class="card card-hover provider-card">
      <a href="${root}provider.html?id=${p.id}" aria-label="${p.name}">
        <div class="pc-media">${TK.art(p.hue, p.id.charCodeAt(1))}
          <div class="pc-benefit"><span class="badge">${TK.icon(p.benefit.kind === "price" ? "tag" : "sparkle", 15)} ${p.benefit.label}</span></div>
        </div>
      </a>
      <div class="pc-body">
        <div class="pc-toprow">
          ${TK.logoBadge(p)}
          <div style="min-width:0">
            <h3><a href="${root}provider.html?id=${p.id}">${p.name}</a> ${p.verified ? `<span class="verified-badge" title="مركز موثق">${TK.icon("verified", 15)}</span>` : ""}</h3>
            <div class="pc-meta"><span>${p.type}</span><span>·</span><span>${p.specialty}</span></div>
          </div>
        </div>
        <div class="pc-meta">
          <span class="distance-chip">${TK.icon("pin", 14)} ${p.distanceKm} كم</span>
          <span class="badge ${p.open ? "badge-open" : "badge-closed"}">${p.open ? `مفتوح · حتى ${p.closesAt}` : `مغلق · يفتح ${p.opensAt}`}</span>
        </div>
        <div class="pc-foot">
          <span class="rating">${TK.icon("star", 15)} ${p.rating} <span class="count">(${TK.sar(p.ratingCount)})</span></span>
          <button class="btn btn-secondary btn-sm" data-directions="${p.name}">${TK.icon("direction", 15)} الاتجاهات</button>
        </div>
      </div>
    </article>`;

  TK.serviceCard = s => {
    const p = TK.providers.find(x => x.id === s.providerId);
    const save = s.was - s.price;
    return `
    <article class="card card-hover service-card">
      <a href="${root}service.html?id=${s.id}" aria-label="${s.title}">
        <div class="sc-media">${TK.art(s.hue, s.id.charCodeAt(1))}
          <span class="sc-save">${TK.icon("trend", 13)} وفّر ${TK.sar(save)} ر.س</span>
        </div>
      </a>
      <div class="sc-body">
        <div class="sc-provider"><span class="dot-logo" style="background:hsl(${p.hue},55%,36%)">${p.initial}</span> ${p.name} ${p.verified ? TK.icon("verified", 13) : ""}</div>
        <h3><a href="${root}service.html?id=${s.id}">${s.title}</a></h3>
        <div class="price-row">
          <span class="price-now">${TK.sar(s.price)}<span class="cur">ر.س</span></span>
          <span class="price-was">${TK.sar(s.was)} ر.س</span>
        </div>
        <div class="sc-foot">
          <span>${TK.icon("clock", 14)} صالحة ${s.validityDays} يومًا</span>
          <a class="btn btn-primary btn-sm" href="${root}service.html?id=${s.id}">اشترِ الخدمة</a>
        </div>
      </div>
    </article>`;
  };

  TK.offerCard = o => {
    const p = TK.providers.find(x => x.id === o.providerId);
    const days = Math.max(0, Math.ceil((new Date(o.expires) - new Date("2026-08-10")) / 86400000));
    return `
    <article class="card card-hover offer-card">
      <div class="oc-top">
        <div class="offer-value">${o.value}<small>${o.sub}</small></div>
        ${TK.logoBadge(p, 46, 14)}
      </div>
      <div class="oc-body">
        <h3 class="t-h3">${o.title}</h3>
        <div class="sc-provider"><span class="dot-logo" style="background:hsl(${p.hue},55%,36%)">${p.initial}</span> ${p.name} ${TK.icon("verified", 13)}</div>
        <p class="t-caption">${o.terms}</p>
        <span class="oc-expiry">${TK.icon("clock", 14)} ${days === 0 ? "ينتهي اليوم" : `يتبقى ${days} يومًا`}</span>
      </div>
      <div class="oc-foot">
        <span class="t-caption">عرض موثق ${TK.icon("verified", 13)}</span>
        <a class="btn btn-dark btn-sm" href="${root}provider.html?id=${p.id}">استفد من العرض</a>
      </div>
    </article>`;
  };

  /* ---------------- Global demo interactions ---------------- */
  document.addEventListener("click", e => {
    const d = e.target.closest("[data-directions]");
    if (d) { e.preventDefault(); TK.toast(`فتح الاتجاهات إلى ${d.dataset.directions} (نموذج عرض)`); }
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) { TK.toast("النسخة الإنجليزية قيد الإعداد — البنية جاهزة للغتين", "info"); }
    const mock = e.target.closest("[data-mock]");
    if (mock) { e.preventDefault(); TK.toast(mock.dataset.mock, mock.dataset.mockKind || "success"); }
  });

  /* ---------------- Boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-enter");
    buildHeader(); buildDrawer(); buildBottomNav(); buildSearchOverlay(); buildToasts(); buildOffline(); buildFooter();
    initReveal();
  });
})();
