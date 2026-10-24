# Flower

Практичні заняття № 19–23. React: компоненти, props, useState та події (L'Heure Bleue, Mirabilis jalapa).

## Запуск

Потрібні два термінали: один для API-сервера, другий для фронтенду.

```bash
# термінал 1: сервер (http://localhost:3000)
cd server
npm install
npm start

# термінал 2: фронтенд (http://localhost:5173)
npm install
npm run dev
```

Якщо сервер не запущено, на сторінці з'явиться повідомлення про помилку з кнопкою «Спробувати ще раз».

Тести (вбудований `node:test`):

```bash
npm test              # перевірка телефону (корінь проєкту)
cd server && npm test # маршрути API
```

## Структура

```
server/
├── server.js             Express API: GET /api/projects, GET /api/projects/:id, POST /api/contact
├── server.test.js        тести маршрутів
└── package.json
src/
├── main.jsx              точка входу
├── assets/photos-src/    оригінали фото (стискаються командою npm run images)
├── api.js                fetch-запити до сервера (getProjects, sendContact)
├── App.jsx               завантаження карток із API і збірка сторінки
├── index.css             токени, базові стилі та стилі компонентів
├── utils/                validatePhone.js та його тести
├── data/navLinks.js      посилання меню (Header і Footer)
├── assets/icons/         іконки карток
└── components/
    ├── Header.jsx
    ├── Hero.jsx
    ├── Section.jsx       секція з title і children (додаткове завдання)
    ├── Card.jsx          props: title, text, image; стан лічильника вподобань
    ├── CategoryFilter.jsx кнопки фільтра карток
    ├── ContactForm.jsx   контрольоване поле імені та привітання
    └── Footer.jsx
```

## Інтерактивність (Практичне 20)

| Що | Де живе стан |
|---|---|
| Лічильник вподобань | `Card.jsx`: `count`, власний у кожної картки |
| Перемикач теми | `App.jsx`: `theme` (клас `theme-light` / `theme-dark` на кореневому елементі) |
| Фільтр карток | `App.jsx`: `category`, список через `projects.filter(...)` |
| Контрольована форма | `ContactForm.jsx`: `name`, привітання виводиться під полем |
| Збереження теми | `useEffect` + `localStorage` (додаткове завдання) |

## AI-асистент (Практичне 21)

Перевірка телефону `+380XXXXXXXXX` у `ContactForm.jsx`, винесена в `src/utils/validatePhone.js` з unit-тестами. Промпти, налагодження й висновки: [AI-NOTES.md](AI-NOTES.md).

## Node.js API (Практичне 22)

| Маршрут | Що робить |
|---|---|
| `GET /api/projects` | повертає масив карток догляду у форматі JSON |
| `GET /api/projects/:id` | повертає один проєкт або `404`, якщо id не існує (додаткове завдання) |
| `POST /api/contact` | приймає `{ name, phone }`, виводить у консоль сервера й повертає `{ ok: true }`; некоректний телефон дає `400` |

CORS увімкнено (`app.use(cors())`), тому фронтенд з порту 5173 може звертатись до сервера на порту 3000. Адресу API можна змінити змінною `VITE_API_URL`.

## Продуктивність (Практичне 23)

Зображення стискаються у WebP/AVIF командою `npm run images` (результат у `public/images`), шрифти розміщені локально в `public/fonts`. Performance у Lighthouse (Mobile) зріс з 84 до 97. Таблиця «до/після», звіти та примітки: [docs/PERFORMANCE.md](docs/PERFORMANCE.md).
