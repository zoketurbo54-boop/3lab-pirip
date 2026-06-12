/**
 * Обработка форм сайта UltraBot (ПР — «Управление сайтом при помощи JS»)
 */

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function showFormError(form, message) {
  let box = form.querySelector(".form-error");
  if (!box) {
    box = document.createElement("p");
    box.className = "form-error";
    form.insertBefore(box, form.firstChild);
  }
  box.textContent = message;
  box.hidden = false;
}

function hideFormError(form) {
  const box = form.querySelector(".form-error");
  if (box) box.hidden = true;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

/** Форма обратной связи — contacts.html */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideFormError(form);

    const data = getFormData(form);
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    if (name.length < 2) {
      showFormError(form, "Укажите имя (минимум 2 символа).");
      form.elements.name.focus();
      return;
    }
    if (!validateEmail(email)) {
      showFormError(form, "Введите корректный email.");
      form.elements.email.focus();
      return;
    }
    if (message.length < 10) {
      showFormError(form, "Сообщение должно содержать не менее 10 символов.");
      form.elements.message.focus();
      return;
    }

    console.log("Отправка формы обратной связи:", data);
    showToast(`Спасибо, ${name}! Мы ответим на ${email} в течение 15 минут.`);
    form.reset();
  });
}

/** Форма фильтров каталога — catalog.html */
function initCatalogFilterForm(applyFilters) {
  const form = document.getElementById("catalogFilterForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (typeof applyFilters === "function") applyFilters();
    showToast("Фильтры применены");
  });

  form.addEventListener("reset", function () {
    setTimeout(function () {
      document.querySelectorAll(".cat-filter").forEach(function (btn, i) {
        btn.classList.toggle("active", i === 0);
      });
      if (typeof applyFilters === "function") applyFilters();
      showToast("Фильтры сброшены");
    }, 0);
  });
}

/** Форма оформления заказа — cart.html */
function initCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideFormError(form);

    const data = getFormData(form);
    const steamId = (data.steamId || "").trim();

    if (steamId.length < 3) {
      showFormError(form, "Укажите Steam Trade URL или никнейм.");
      form.elements.steamId.focus();
      return;
    }

    const delivery = data.delivery === "classic" ? "классический обмен" : "Instant Trade";
    const payLabels = { card: "карта", balance: "баланс UltraBot", crypto: "криптовалюта" };
    const payment = payLabels[data.payment] || "карта";

    console.log("Оформление заказа:", { steamId, delivery, payment, total: getCartTotal() });

    saveCart([]);
    updateCartBadge();
    showToast(`Заказ оформлён (${payment}, ${delivery}). Trade offer отправлен.`);

    setTimeout(function () {
      location.reload();
    }, 1200);
  });
}

/** Форма пополнения баланса — account.html */
function initDepositForm() {
  const form = document.getElementById("depositForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideFormError(form);

    const amount = Number(form.elements.amount.value);
    if (!amount || amount < 1) {
      showFormError(form, "Минимальная сумма пополнения — $1.");
      form.elements.amount.focus();
      return;
    }
    if (amount > 10000) {
      showFormError(form, "Максимальная сумма за одну операцию — $10 000.");
      form.elements.amount.focus();
      return;
    }

    console.log("Пополнение баланса:", amount);
    showToast(`Запрос на пополнение $${amount.toLocaleString("en-US")} отправлен.`);
    form.reset();
  });
}

/** Форма подписки на рассылку — index.html */
function initSubscribeForm() {
  const form = document.getElementById("subscribeForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hideFormError(form);

    const email = (form.elements.email.value || "").trim();
    if (!validateEmail(email)) {
      showFormError(form, "Введите корректный email для подписки.");
      form.elements.email.focus();
      return;
    }

    console.log("Подписка на рассылку:", email);
    showToast("Вы подписались на новости UltraBot.");
    form.reset();
  });
}

function bindPageForms(pageInit) {
  if (typeof pageInit === "function") pageInit();
}
