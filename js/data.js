const STEAM_IMG = "https://community.cloudflare.steamstatic.com/economy/image";

const SKINS = [
  { id: 1, name: "Karambit | Fade", weapon: "Karambit", category: "knives", rarity: "Covert", quality: "FN", float: 0.02, pattern: 412, price: 1250, crypto: 0.018, hot: true, top: true, stock: true, color: "#ff6ec7", image: "images/skin-1.png" },
  { id: 2, name: "M9 Bayonet | Doppler", weapon: "M9 Bayonet", category: "knives", rarity: "Covert", quality: "FN", float: 0.01, pattern: "Phase 2", price: 980, crypto: 0.014, hot: true, top: true, stock: true, color: "#7c3aed", image: "images/skin-2.png" },
  { id: 3, name: "AK-47 | Fire Serpent", weapon: "AK-47", category: "rifles", rarity: "Covert", quality: "MW", float: 0.08, pattern: 661, price: 890, crypto: 0.013, hot: false, top: true, stock: true, color: "#f97316", image: "images/skin-3.png" },
  { id: 4, name: "AWP | Dragon Lore", weapon: "AWP", category: "snipers", rarity: "Covert", quality: "FT", float: 0.28, pattern: 103, price: 4200, crypto: 0.062, hot: true, top: true, stock: false, color: "#eab308", image: "images/skin-4.png" },
  { id: 5, name: "M4A4 | Howl", weapon: "M4A4", category: "rifles", rarity: "Contraband", quality: "MW", float: 0.11, pattern: 88, price: 3100, crypto: 0.045, hot: true, top: false, stock: true, color: "#ef4444", image: "images/skin-5.png" },
  { id: 6, name: "Sport Gloves | Pandora's Box", weapon: "Перчатки", category: "gloves", rarity: "Extraordinary", quality: "FT", float: 0.32, pattern: 220, price: 2800, crypto: 0.041, hot: false, top: true, stock: true, color: "#a855f7", image: "images/skin-6.png" },
  { id: 7, name: "Butterfly Knife | Tiger Tooth", weapon: "Butterfly", category: "knives", rarity: "Covert", quality: "FN", float: 0.03, pattern: 501, price: 1100, crypto: 0.016, hot: true, top: false, stock: true, color: "#fbbf24", image: "images/skin-7.png" },
  { id: 8, name: "AK-47 | Redline", weapon: "AK-47", category: "rifles", rarity: "Classified", quality: "FT", float: 0.18, pattern: 334, price: 45, crypto: 0.0007, hot: false, top: false, stock: true, color: "#dc2626", image: "images/skin-8.png" },
  { id: 9, name: "AWP | Asiimov", weapon: "AWP", category: "snipers", rarity: "Covert", quality: "FT", float: 0.24, pattern: 177, price: 120, crypto: 0.0018, hot: true, top: false, stock: true, color: "#f97316", image: "images/skin-9.png" },
  { id: 10, name: "M4A1-S | Printstream", weapon: "M4A1-S", category: "rifles", rarity: "Covert", quality: "FN", float: 0.05, pattern: 290, price: 210, crypto: 0.003, hot: false, top: false, stock: true, color: "#e5e7eb", image: "images/skin-10.png" },
  { id: 11, name: "Driver Gloves | King Snake", weapon: "Перчатки", category: "gloves", rarity: "Extraordinary", quality: "MW", float: 0.12, pattern: 415, price: 650, crypto: 0.009, hot: false, top: false, stock: true, color: "#f5f5f4", image: "images/skin-11.png" },
  { id: 12, name: "Desert Eagle | Blaze", weapon: "Desert Eagle", category: "pistols", rarity: "Restricted", quality: "FN", float: 0.009, pattern: 55, price: 780, crypto: 0.011, hot: true, top: false, stock: true, color: "#fb923c", image: "images/skin-12.png" },
  { id: 13, name: "USP-S | Kill Confirmed", weapon: "USP-S", category: "pistols", rarity: "Covert", quality: "MW", float: 0.09, pattern: 142, price: 95, crypto: 0.0014, hot: false, top: false, stock: true, color: "#b91c1c", image: "images/skin-13.png" },
  { id: 14, name: "Glock-18 | Fade", weapon: "Glock-18", category: "pistols", rarity: "Restricted", quality: "FN", float: 0.01, pattern: 763, price: 520, crypto: 0.0075, hot: false, top: false, stock: true, color: "#c084fc", image: "images/skin-14.png" },
  { id: 15, name: "AWP | Gungnir", weapon: "AWP", category: "snipers", rarity: "Covert", quality: "FN", float: 0.04, pattern: 318, price: 8900, crypto: 0.13, hot: true, top: true, stock: false, color: "#38bdf8", image: "images/skin-15.png" },
  { id: 16, name: "Skeleton Knife | Crimson Web", weapon: "Skeleton", category: "knives", rarity: "Covert", quality: "MW", float: 0.14, pattern: 602, price: 720, crypto: 0.01, hot: false, top: false, stock: true, color: "#991b1b", image: "images/skin-16.png" }
];

const BLOG_POSTS = [
  { id: 1, title: "Обновление CS2: новые скины Operation", date: "2026-05-18", tag: "Новости", excerpt: "Valve представила новую коллекцию скинов с уникальными паттернами и анимациями.", image: "images/skin-15.png" },
  { id: 2, title: "Гайд: как оценить float и паттерн", date: "2026-05-12", tag: "Гайд", excerpt: "Разбираем, почему float 0.00x может стоить в 10 раз дороже обычного скина.", image: "images/skin-1.png" },
  { id: 3, title: "Аналитика рынка: ножи в мае 2026", date: "2026-05-05", tag: "Аналитика", excerpt: "Karambit и Butterfly снова в топе — что покупать трейдеру прямо сейчас.", image: "images/skin-7.png" },
  { id: 4, title: "Безопасный трейд: 5 правил", date: "2026-04-28", tag: "Гайд", excerpt: "Как не попасть на скам и безопасно обменивать скины через Steam Trade Offer.", image: "images/skin-9.png" }
];

const CATEGORIES = [
  { id: "knives", name: "Ножи", icon: "🔪", count: 4, image: "images/skin-1.png" },
  { id: "gloves", name: "Перчатки", icon: "🧤", count: 2, image: "images/skin-6.png" },
  { id: "rifles", name: "M4 / AK", icon: "🔫", count: 4, image: "images/skin-3.png" },
  { id: "snipers", name: "AWP", icon: "🎯", count: 3, image: "images/skin-4.png" }
];

const ACCOUNT_HISTORY = [
  { date: "20.05.2026", skinId: 8, type: "Покупка", price: 45, status: "Выполнено" },
  { date: "15.05.2026", skinId: 9, type: "Покупка", price: 120, status: "Выполнено" },
  { date: "10.05.2026", skinId: 14, type: "Продажа", price: 520, status: "Выполнено" }
];

const BUFFER_SKINS = [8, 9];

const QUALITIES = ["FN", "MW", "FT", "WW", "BS"];
const RARITIES = ["Contraband", "Covert", "Extraordinary", "Classified", "Restricted"];

function getSkinById(id) {
  return SKINS.find(s => s.id === Number(id));
}

function getSkinImage(skin) {
  return skin?.image || "";
}

function formatPrice(usd) {
  return "$" + usd.toLocaleString("en-US");
}

function getFloatBar(float) {
  const pct = Math.min(float * 100, 100);
  let color = "#39ff14";
  if (float > 0.15) color = "#fbbf24";
  if (float > 0.38) color = "#ef4444";
  return { pct, color };
}

function skinImgTag(skin, className, alt) {
  return `<img src="${getSkinImage(skin)}" alt="${alt || skin.name}" class="${className}" loading="lazy">`;
}
