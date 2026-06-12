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

function landingSkinCard(skin) {
  const floatInfo = getFloatBar(skin.float);
  const rarityColor = getRarityColor(skin.rarity);
  return `
    <article class="skin-card landing-card${!skin.stock ? " out-of-stock" : ""}">
      ${skin.hot ? '<span class="badge-hot">Акция</span>' : ""}
      ${!skin.stock ? '<span class="badge-oos">Нет в наличии</span>' : ""}
      <div class="skin-preview">
        <div class="skin-3d">
          <img src="${skin.image}" alt="${skin.name}" class="skin-img" loading="lazy">
        </div>
      </div>
      <div class="skin-info">
        <span class="skin-rarity" style="color:${rarityColor}">${skin.rarity}</span>
        <h3>${skin.name}</h3>
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
        </div>
      </div>
    </article>`;
}

function renderLandingGrid(skins, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = skins.map(landingSkinCard).join("");
}

function initLanding() {
  renderLandingGrid(SKINS.filter(s => s.hot).slice(0, 4), "hotSkins");
  renderLandingGrid(SKINS.filter(s => s.top), "topSkins");

  const catEl = document.getElementById("categories");
  if (catEl) {
    catEl.innerHTML = CATEGORIES.map(c => `
      <div class="category-card">
        <div class="cat-preview"><img src="${c.image}" alt="${c.name}" loading="lazy"></div>
        <h3>${c.name}</h3>
        <span>${c.count} ${c.count === 1 ? "скин" : c.count < 5 ? "скина" : "скинов"}</span>
      </div>`).join("");
  }

  const showcase = document.getElementById("heroShowcase");
  const featured = getSkinById(1);
  const mini = [getSkinById(2), getSkinById(4), getSkinById(6)].filter(Boolean);
  if (showcase && featured) {
    showcase.innerHTML = `
      <div class="hero-showcase-head">
        <strong>Лот дня</strong>
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
          <div class="hero-mini">
            <img src="${s.image}" alt="${s.name}">
            <span>${formatPrice(s.price)}</span>
          </div>`).join("")}
      </div>`;
  }

  initSubscribeForm();
}

initLanding();
