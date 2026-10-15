// Змінні let/const з даними проєкту
const projectName = "L'Heure Bleue";
const flowerName = "Mirabilis Jalapa";
const careTips = ["Освітлення", "Полив", "Ґрунт", "Температура"];
let currentYear = new Date().getFullYear(); 

// Перевірка значень у DevTools → Console
console.log("Проєкт:", projectName);
console.log("Квітка:", flowerName);
console.log("Поради з догляду:", careTips);
console.log("Поточний рік:", currentYear);

// querySelector — вибір одного елемента
const heroTitle = document.querySelector("h1");
const yearSpan = document.querySelector("#current-year");
console.log("Заголовок h1:", heroTitle.textContent);

// Зміна текстового вмісту: поточний рік у футері
yearSpan.textContent = currentYear;

// querySelectorAll — вибір кількох елементів
const careCards = document.querySelectorAll("#care article");
console.log("Кількість карток догляду:", careCards.length);

// classList.add — підсвічуємо активний пункт меню (перший пункт хедера)
const navLinks = document.querySelectorAll("header.site-header nav a");
navLinks[0].classList.add("active");
console.log("Пунктів меню:", navLinks.length);
