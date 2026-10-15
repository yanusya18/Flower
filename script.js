// script.js — Заняття 14: базові скрипти, робота з DOM

// 2. Змінні let/const з даними проєкту
const projectName = "L'Heure Bleue";
const flowerName = "Mirabilis Jalapa";
const careTips = ["Освітлення", "Полив", "Ґрунт", "Температура"];
let currentYear = new Date().getFullYear(); // додаткове завдання: рік без жорстко вписаного числа

// 3. Перевірка значень у DevTools → Console
console.log("Проєкт:", projectName);
console.log("Квітка:", flowerName);
console.log("Поради з догляду:", careTips);
console.log("Поточний рік:", currentYear);

// 4. querySelector — вибір одного елемента
const heroTitle = document.querySelector("h1");
const yearSpan = document.querySelector("#current-year");
console.log("Заголовок h1:", heroTitle.textContent);

// 5. Зміна текстового вмісту: поточний рік у футері
yearSpan.textContent = currentYear;

// 6. querySelectorAll — вибір кількох елементів
const careCards = document.querySelectorAll("#care article");
console.log("Кількість карток догляду:", careCards.length);

// 7. classList.add — підсвічуємо активний пункт меню (перший пункт хедера)
const navLinks = document.querySelectorAll("header.site-header nav a");
navLinks[0].classList.add("active");
console.log("Пунктів меню:", navLinks.length);

// =========================================================
// Заняття 15: обробка подій та валідація форми
// =========================================================

// 1-2. Перемикач теми через addEventListener (атрибут data-theme з Заняття 9)
const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", function () {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  if (isDark) {
    html.removeAttribute("data-theme");
    themeToggle.textContent = "🌙 Тема";
  } else {
    html.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️ Тема";
  }
});

// 3. Обробник submit з preventDefault — сторінка не перезавантажується
const form = document.querySelector("#contact-form");
const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const messageInput = document.querySelector("#message");
const formMessage = document.querySelector("#form-message");

// 6. Показ повідомлення на сторінці (а не лише в консолі)
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = type; // "error" або "success"
}

// 5. Перевірка email: не порожній і містить «@»
function validateEmail(value) {
  if (value.trim() === "") {
    return "Введіть email.";
  }
  if (!value.includes("@")) {
    return "Email має містити символ «@».";
  }
  return "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // 4. Отримання значень полів
  const name = nameInput.value.trim();
  const email = emailInput.value;
  const message = messageInput.value.trim();
  console.log("Відправка форми:", { name, email, message });

  if (name === "") {
    nameInput.classList.add("invalid");
    showMessage("Введіть ім'я.", "error");
    return;
  }
  nameInput.classList.remove("invalid");

  const emailError = validateEmail(email);
  if (emailError) {
    emailInput.classList.add("invalid");
    showMessage(emailError, "error");
    return;
  }
  emailInput.classList.remove("invalid");

  if (message === "") {
    messageInput.classList.add("invalid");
    showMessage("Введіть повідомлення.", "error");
    return;
  }
  messageInput.classList.remove("invalid");

  showMessage("Дякуємо, " + name + "! Повідомлення надіслано.", "success");
  form.reset();
});

// 7. Додаткове завдання: inline-валідація email під час вводу
emailInput.addEventListener("input", function () {
  const emailError = validateEmail(emailInput.value);
  if (emailError) {
    emailInput.classList.add("invalid");
    showMessage(emailError, "error");
  } else {
    emailInput.classList.remove("invalid");
    showMessage("Email виглядає коректно.", "success");
  }
});
