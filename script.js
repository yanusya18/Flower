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

// Адреса тестового API (Заняття 18). jsonplaceholder приймає запити, але нічого не зберігає.
const API_URL = "https://jsonplaceholder.typicode.com";
const submitButton = form.querySelector('button[type="submit"]');

// Заняття 18, кроки 4-8: async/await, збір даних, POST, response.ok, стан завантаження
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Крок 5: збираємо дані форми в об'єкт {name, email, message}
  const data = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  };
  console.log("Відправка форми:", data);

  // Валідація (Заняття 15) — до запиту
  if (data.name === "") {
    nameInput.classList.add("invalid");
    showMessage("Введіть ім'я.", "error");
    return;
  }
  nameInput.classList.remove("invalid");

  const emailError = validateEmail(data.email);
  if (emailError) {
    emailInput.classList.add("invalid");
    showMessage(emailError, "error");
    return;
  }
  emailInput.classList.remove("invalid");

  if (data.message === "") {
    messageInput.classList.add("invalid");
    showMessage("Введіть повідомлення.", "error");
    return;
  }
  messageInput.classList.remove("invalid");

  // стан завантаження — вимикаємо кнопку на час запиту
  const defaultButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Надсилання…";
  showMessage("", "");

  try {
    // POST із JSON
    const response = await fetch(API_URL + "/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error("Сервер повернув помилку " + response.status);
    }

    const result = await response.json();
    console.log("Відповідь сервера:", result);
    showMessage("Дякуємо, " + data.name + "! Повідомлення надіслано (№ " + result.id + ").", "success");
    form.reset();
  } catch (error) {
    console.error("Помилка надсилання:", error);
    if (error.name === "TypeError") {
      // fetch кидає TypeError, коли немає мережі
      showMessage("Не вдалося надіслати: перевірте інтернет-з'єднання й спробуйте ще раз.", "error");
    } else {
      showMessage("Не вдалося надіслати повідомлення. " + error.message + ". Спробуйте пізніше.", "error");
    }
  } finally {
    // Повертаємо кнопку у звичайний стан у будь-якому разі
    submitButton.disabled = false;
    submitButton.textContent = defaultButtonText;
  }
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

// =========================================================
// Заняття 18: GET-запит — відгуки з API
// =========================================================
const reviewsList = document.querySelector("#reviews-list");
const reviewsStatus = document.querySelector("#reviews-status");

// Кроки 3-4: async/await з try/catch (замість ланцюжка .then())
async function loadReviews() {
  try {
    const response = await fetch(API_URL + "/posts?_limit=3");
    if (!response.ok) {
      throw new Error("Сервер повернув помилку " + response.status);
    }
    const posts = await response.json();
    console.log("Отримано відгуків:", posts.length, posts);

    reviewsList.innerHTML = "";
    posts.forEach(function (post) {
      const item = document.createElement("li");
      item.className = "review-card";
      const title = document.createElement("h3");
      title.textContent = post.title; // textContent — безпечно, без HTML-ін'єкцій
      const meta = document.createElement("p");
      meta.className = "review-meta";
      meta.textContent = "Відгук № " + post.id;
      item.append(title, meta);
      reviewsList.appendChild(item);
    });
    reviewsStatus.textContent = "";
    reviewsStatus.className = "";
  } catch (error) {
    console.error("Помилка завантаження відгуків:", error);
    reviewsStatus.textContent = "Не вдалося завантажити відгуки. Перевірте з'єднання й оновіть сторінку.";
    reviewsStatus.className = "error";
  }
}

loadReviews();
