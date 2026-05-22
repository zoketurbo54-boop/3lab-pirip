const CART_KEY = "ultrabot_cart";

const ICON_USER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-4 3.5-6 7-6s7 2 7 6"/></svg>`;
const ICON_CART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M6 6L5 3H2"/></svg>`;

const RARITY_COLORS = {
  Contraband: "#e4ae39",
  Covert: "#eb4b4b",
  Extraordinary: "#eb4b4b",
  Classified: "#d32ce6",
  Restricted: "#8847ff"
};

function getRarityColor(rarity) {
  return RARITY_COLORS[rarity] || "#8b909a";
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(skinId) {
  const skin = getSkinById(skinId);
  if (!skin) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === skin.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: skin.id, qty: 1 });
  }
  saveCart(cart);
  showToast(`«${skin.name}» добавлен в корзину`);
}

function removeFromCart(skinId) {
  saveCart(getCart().filter(i => i.id !== skinId));
}

function updateCartQty(skinId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === skinId);
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(skinId);
  } else {
    item.qty = qty;
    saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const skin = getSkinById(item.id);
    return sum + (skin ? skin.price * item.qty : 0);
  }, 0);
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  badge.textContent = count;
  badge.hidden = count === 0;
}

function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function renderHeader(active) {
  const cartCount = getCart().reduce((s, i) => s + i.qty, 0);
  const links = [
    { href: "index.html", label: "Главная", key: "home" },
    { href: "catalog.html", label: "Каталог", key: "catalog" },
    { href: "blog.html", label: "Блог", key: "blog" },
    { href: "about.html", label: "О нас", key: "about" },
    { href: "contacts.html", label: "Контакты", key: "contacts" }
  ];

  return `
    <div class="topbar">
      <div class="container topbar-inner">
        <span>Поддержка: help@ultrabot.gg · Пн–Вс 10:00–22:00</span>
        <div class="topbar-status">
          <span class="status-dot"></span>
          <a href="https://steamstat.us/" target="_blank" rel="noopener">Steam работает</a>
        </div>
      </div>
    </div>
    <header class="header">
      <div class="container header-inner">
        <a href="index.html" class="logo">
          <span class="logo-mark">UB</span>
          <span class="logo-text">UltraBot</span>
        </a>
        <nav class="nav">
          ${links.map(l => `<a href="${l.href}" class="nav-link${active === l.key ? " active" : ""}">${l.label}</a>`).join("")}
        </nav>
        <div class="header-actions">
          <a href="account.html" class="btn-icon" title="Личный кабинет">${ICON_USER}</a>
          <a href="cart.html" class="btn-icon cart-btn" title="Корзина">
            ${ICON_CART}
            <span class="cart-badge"${cartCount === 0 ? " hidden" : ""}>${cartCount}</span>
          </a>
        </div>
        <button class="burger" aria-label="Меню" onclick="toggleMenu()">☰</button>
      </div>
      <div class="mobile-nav" id="mobileNav">
        ${links.map(l => `<a href="${l.href}">${l.label}</a>`).join("")}
        <a href="account.html">Личный кабинет</a>
        <a href="cart.html">Корзина</a>
      </div>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-mark">UB</span>
            <span class="logo-text">UltraBot</span>
          </div>
          <p>Маркетплейс скинов CS2. Покупка и продажа через Steam Trade Offer.</p>
          <div class="socials">
            <a href="#">Telegram</a>
            <a href="#">Discord</a>
            <a href="#">VK</a>
          </div>
        </div>
        <div>
          <h4>Магазин</h4>
          <a href="catalog.html">Каталог</a>
          <a href="catalog.html?category=knives">Ножи</a>
          <a href="catalog.html?category=gloves">Перчатки</a>
          <a href="catalog.html?category=snipers">AWP</a>
        </div>
        <div>
          <h4>Информация</h4>
          <a href="about.html">О нас</a>
          <a href="rules.html">Правила и гарантия</a>
          <a href="blog.html">Блог</a>
          <a href="contacts.html">Контакты</a>
        </div>
        <div>
          <h4>Поддержка</h4>
          <a href="contacts.html">help@ultrabot.gg</a>
          <a href="https://steamstat.us/" target="_blank" rel="noopener">Статус Steam ботов ↗</a>
          <a href="account.html">API-ключи</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 UltraBot · Александр Сафронов</span>
        <span>Не аффилирован с Valve Corporation</span>
      </div>
    </footer>`;
}

function initLayout(active) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = renderHeader(active);
  if (footerEl) footerEl.innerHTML = renderFooter();
}

function toggleMenu() {
  document.getElementById("mobileNav")?.classList.toggle("open");
}

function skinCardHTML(skin, opts = {}) {
  const floatInfo = getFloatBar(skin.float);
  const rarityColor = getRarityColor(skin.rarity);
  return `
    <article class="skin-card${!skin.stock ? " out-of-stock" : ""}" data-id="${skin.id}">
      ${skin.hot ? '<span class="badge-hot">Акция</span>' : ""}
      ${!skin.stock ? '<span class="badge-oos">Нет в наличии</span>' : ""}
      <a href="skin.html?id=${skin.id}" class="skin-preview">
        <div class="skin-3d">
          ${skinImgTag(skin, "skin-img")}
        </div>
      </a>
      <div class="skin-info">
        <span class="skin-rarity" style="color:${rarityColor}">${skin.rarity}</span>
        <h3><a href="skin.html?id=${skin.id}">${skin.name}</a></h3>
        <div class="skin-meta">
          <span class="quality">${skin.quality}</span>
          <span class="float-val">Float: ${skin.float.toFixed(3)}</span>
        </div>
        <div class="float-bar"><div class="float-fill" style="width:${floatInfo.pct}%;background:${floatInfo.color}"></div></div>
        <div class="skin-price-row">
          <div>
            <span class="price">${formatPrice(skin.price)}</span>
            <span class="price-crypto">${skin.crypto} BTC</span>
          </div>
          ${opts.showBuy !== false && skin.stock ? `<button class="btn btn-sm btn-buy" onclick="event.preventDefault();addToCart(${skin.id})">Купить</button>` : ""}
        </div>
      </div>
    </article>`;
}

function renderSkinGrid(skins, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = skins.length
    ? skins.map(s => skinCardHTML(s)).join("")
    : '<p class="empty-msg">Скины не найдены. Попробуйте изменить фильтры.</p>';
}

function initCatalog() {
  const params = new URLSearchParams(location.search);
  const filters = {
    category: params.get("category") || "",
    weapon: "",
    rarity: "",
    quality: "",
    maxPrice: 10000,
    maxFloat: 1,
    inStock: false,
    search: ""
  };

  const weaponSelect = document.getElementById("filterWeapon");
  const raritySelect = document.getElementById("filterRarity");
  const qualitySelect = document.getElementById("filterQuality");
  const priceRange = document.getElementById("filterPrice");
  const floatRange = document.getElementById("filterFloat");
  const stockCheck = document.getElementById("filterStock");
  const searchInput = document.getElementById("filterSearch");
  const priceLabel = document.getElementById("priceLabel");
  const floatLabel = document.getElementById("floatLabel");

  if (params.get("category")) {
    document.querySelectorAll(".cat-filter").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.cat === filters.category);
    });
  }

  function applyFilters() {
    filters.weapon = weaponSelect?.value || "";
    filters.rarity = raritySelect?.value || "";
    filters.quality = qualitySelect?.value || "";
    filters.maxPrice = Number(priceRange?.value || 10000);
    filters.maxFloat = Number(floatRange?.value || 1);
    filters.inStock = stockCheck?.checked || false;
    filters.search = (searchInput?.value || "").toLowerCase();

    if (priceLabel) priceLabel.textContent = "до " + formatPrice(filters.maxPrice);
    if (floatLabel) floatLabel.textContent = "до " + filters.maxFloat.toFixed(2);

    let result = SKINS.filter(s => {
      if (filters.category && s.category !== filters.category) return false;
      if (filters.weapon && s.weapon !== filters.weapon) return false;
      if (filters.rarity && s.rarity !== filters.rarity) return false;
      if (filters.quality && s.quality !== filters.quality) return false;
      if (s.price > filters.maxPrice) return false;
      if (s.float > filters.maxFloat) return false;
      if (filters.inStock && !s.stock) return false;
      if (filters.search && !s.name.toLowerCase().includes(filters.search)) return false;
      return true;
    });

    const countEl = document.getElementById("resultsCount");
    if (countEl) countEl.textContent = result.length;
    renderSkinGrid(result, "catalogGrid");
  }

  document.querySelectorAll(".cat-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filters.category = btn.dataset.cat;
      applyFilters();
    });
  });

  [weaponSelect, raritySelect, qualitySelect, priceRange, floatRange, stockCheck, searchInput]
    .forEach(el => el?.addEventListener("input", applyFilters));

  applyFilters();
  initCatalogFilterForm(applyFilters);
}

function initSkinPage() {
  const params = new URLSearchParams(location.search);
  const skin = getSkinById(params.get("id"));
  const el = document.getElementById("skinDetail");
  if (!el) return;
  if (!skin) {
    el.innerHTML = '<p class="empty-msg">Скин не найден. <a href="catalog.html">Перейти в каталог</a></p>';
    return;
  }

  document.title = `${skin.name} | UltraBot`;
  const floatInfo = getFloatBar(skin.float);

  el.innerHTML = `
    <div class="skin-detail-grid">
      <div class="skin-viewer">
        <div class="viewer-3d">
          <div class="viewer-model">${skinImgTag(skin, "viewer-img")}</div>
        </div>
      </div>
      <div class="skin-detail-info">
        <span class="skin-rarity" style="color:${getRarityColor(skin.rarity)}">${skin.rarity}</span>
        <h1>${skin.name}</h1>
        <div class="detail-stats">
          <div class="stat-box"><span>Качество</span><strong>${skin.quality}</strong></div>
          <div class="stat-box"><span>Float</span><strong>${skin.float.toFixed(4)}</strong></div>
          <div class="stat-box"><span>Паттерн</span><strong>#${skin.pattern}</strong></div>
          <div class="stat-box"><span>Наличие</span><strong>${skin.stock ? "В наличии" : "Под заказ"}</strong></div>
        </div>
        <div class="float-bar large"><div class="float-fill" style="width:${floatInfo.pct}%;background:${floatInfo.color}"></div></div>
        <div class="price-block">
          <span class="price big">${formatPrice(skin.price)}</span>
          <span class="price-crypto">${skin.crypto} BTC</span>
        </div>
        <div class="detail-actions">
          ${skin.stock ? `<button class="btn btn-buy btn-lg" onclick="addToCart(${skin.id})">Купить сейчас</button>` : `<button class="btn btn-ghost btn-lg" disabled>Нет в наличии</button>`}
          <button class="btn btn-ghost btn-lg" onclick="addToCart(${skin.id})">В корзину</button>
        </div>
        <div class="history-block">
          <h3>История продаж</h3>
          <table class="history-table">
            <tr><td>15.05.2026</td><td>${formatPrice(skin.price * 1.05)}</td><td>FN</td></tr>
            <tr><td>02.05.2026</td><td>${formatPrice(skin.price * 0.98)}</td><td>${skin.quality}</td></tr>
            <tr><td>18.04.2026</td><td>${formatPrice(skin.price * 1.12)}</td><td>${skin.quality}</td></tr>
          </table>
        </div>
      </div>
    </div>`;
}

function initCart() {
  const el = document.getElementById("cartContent");
  if (!el) return;
  const cart = getCart();

  if (!cart.length) {
    el.innerHTML = `
      <div class="empty-cart">
        <p>Корзина пуста</p>
        <a href="catalog.html" class="btn btn-buy">Перейти в каталог</a>
      </div>`;
    return;
  }

  let itemsHTML = cart.map(item => {
    const skin = getSkinById(item.id);
    if (!skin) return "";
    return `
      <div class="cart-item">
        <div class="cart-item-preview" style="--skin-color:${skin.color}">${skinImgTag(skin, "cart-img")}</div>
        <div class="cart-item-info">
          <h3>${skin.name}</h3>
          <span>${skin.quality} · Float ${skin.float.toFixed(3)}</span>
        </div>
        <div class="cart-item-qty">
          <button onclick="updateCartQty(${skin.id}, ${item.qty - 1});location.reload()">−</button>
          <span>${item.qty}</span>
          <button onclick="updateCartQty(${skin.id}, ${item.qty + 1});location.reload()">+</button>
        </div>
        <div class="cart-item-price">${formatPrice(skin.price * item.qty)}</div>
        <button class="cart-remove" onclick="removeFromCart(${skin.id});location.reload()">✕</button>
      </div>`;
  }).join("");

  const total = getCartTotal();
  el.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${itemsHTML}</div>
      <aside class="checkout-panel">
        <form id="checkoutForm" novalidate>
          <h2>Оформление заказа</h2>
          <div class="checkout-row"><span>Товаров:</span><span>${cart.reduce((s,i)=>s+i.qty,0)}</span></div>
          <div class="checkout-row total"><span>Итого:</span><span>${formatPrice(total)}</span></div>
          <div class="filter-group" style="margin-top:12px">
            <label for="steamId">Steam Trade URL / ник</label>
            <input type="text" id="steamId" name="steamId" placeholder="https://steamcommunity.com/tradeoffer/new/..." required>
          </div>
          <h3>Способ доставки</h3>
          <label class="radio-card"><input type="radio" name="delivery" value="instant" checked> Instant Trade — мгновенный обмен</label>
          <label class="radio-card"><input type="radio" name="delivery" value="classic"> Классический обмен — до 15 мин</label>
          <h3>Оплата</h3>
          <label class="radio-card"><input type="radio" name="payment" value="card" checked> Банковская карта</label>
          <label class="radio-card"><input type="radio" name="payment" value="balance"> Баланс UltraBot</label>
          <label class="radio-card"><input type="radio" name="payment" value="crypto"> Криптовалюта</label>
          <button type="submit" class="btn btn-buy btn-lg btn-full">Оформить заказ</button>
        </form>
      </aside>
    </div>`;

  initCheckoutForm();
}

function initAccount() {
  const el = document.getElementById("accountContent");
  if (!el) return;
  el.innerHTML = `
    <div class="account-grid">
      <aside class="account-sidebar">
        <div class="user-card">
          <div class="avatar">AK</div>
          <h3>AK Boss</h3>
          <span>Александр Сафронов</span>
        </div>
        <nav class="account-nav">
          <a class="active" href="#">Обзор</a>
          <a href="#">История сделок</a>
          <a href="#">Буфер обмена</a>
          <a href="#">API-ключи</a>
        </nav>
      </aside>
      <div class="account-main">
        <div class="balance-card">
          <div>
            <span>Баланс</span>
            <strong>$1 240.50</strong>
          </div>
          <form class="deposit-form" id="depositForm" novalidate>
            <input type="number" name="amount" min="1" max="10000" step="1" placeholder="Сумма $" required>
            <button type="submit" class="btn btn-buy btn-sm">Пополнить</button>
          </form>
        </div>
        <h2>История сделок</h2>
        <table class="data-table">
          <thead><tr><th>Дата</th><th>Скин</th><th>Тип</th><th>Сумма</th><th>Статус</th></tr></thead>
          <tbody>
            ${ACCOUNT_HISTORY.map(h => {
              const s = getSkinById(h.skinId);
              return `<tr>
                <td>${h.date}</td>
                <td class="history-skin-cell">${s ? `<img src="${s.image}" alt="" class="table-skin-img">${s.name}` : "—"}</td>
                <td>${h.type}</td>
                <td>${formatPrice(h.price)}</td>
                <td><span class="status ok">${h.status}</span></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
        <h2>Буфер обмена</h2>
        <div class="buffer-grid">
          ${BUFFER_SKINS.map(id => {
            const s = getSkinById(id);
            return s ? `<div class="buffer-item" style="--skin-color:${s.color}">${skinImgTag(s, "buffer-img")}</div>` : "";
          }).join("")}
          <div class="buffer-empty">+ Добавить скин</div>
        </div>
        <h2>Steam API</h2>
        <div class="api-block">
          <code>ub_live_a8f3k2m9x1p7q4w6</code>
          <button class="btn btn-ghost btn-sm" onclick="showToast('API-ключ скопирован')">Копировать</button>
        </div>
      </div>
    </div>`;

  initDepositForm();
}

function initBlog() {
  const el = document.getElementById("blogGrid");
  if (!el) return;
  el.innerHTML = BLOG_POSTS.map(p => `
    <article class="blog-card">
      <div class="blog-thumb"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
      <span class="blog-tag">${p.tag}</span>
      <time>${p.date}</time>
      <h3>${p.title}</h3>
      <p>${p.excerpt}</p>
      <a href="#" class="link-arrow">Читать →</a>
    </article>`).join("");
}

function initHome() {
  renderSkinGrid(SKINS.filter(s => s.hot).slice(0, 4), "hotSkins");
  renderSkinGrid(SKINS.filter(s => s.top), "topSkins");

  const catEl = document.getElementById("categories");
  if (catEl) {
    catEl.innerHTML = CATEGORIES.map(c => `
      <a href="catalog.html?category=${c.id}" class="category-card">
        <div class="cat-preview"><img src="${c.image}" alt="${c.name}" loading="lazy"></div>
        <h3>${c.name}</h3>
        <span>${c.count} ${c.count === 1 ? "скин" : c.count < 5 ? "скина" : "скинов"}</span>
      </a>`).join("");
  }

  const showcase = document.getElementById("heroShowcase");
  const featured = getSkinById(1);
  const mini = [getSkinById(2), getSkinById(4), getSkinById(6)].filter(Boolean);
  if (showcase && featured) {
    showcase.innerHTML = `
      <div class="hero-showcase-head">
        <strong>Лот дня</strong>
        <a href="skin.html?id=${featured.id}" class="link-arrow">Подробнее</a>
      </div>
      <div class="hero-showcase-body">
        <img src="${featured.image}" alt="${featured.name}">
        <div class="hero-showcase-meta">
          <h3>${featured.name}</h3>
          <span class="price">${formatPrice(featured.price)}</span>
        </div>
      </div>
      <div class="hero-showcase-foot">
        ${mini.map(s => `
          <a href="skin.html?id=${s.id}" class="hero-mini">
            <img src="${s.image}" alt="${s.name}">
            <span>${formatPrice(s.price)}</span>
          </a>`).join("")}
      </div>`;
  }
}
