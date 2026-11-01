# Flower (L'Heure Bleue)

Лендінг про квітку **Mirabilis jalapa** («нічну красуню»), яка розкривається ввечері. Навчальний проєкт: від макета у Figma до опублікованого PWA-застосунку.

## Посилання

- **Живий сайт:** [вставте посилання після деплою на Netlify]
- **Репозиторій:** [вставте посилання на GitHub-репозиторій]
- **Figma-макет:** https://www.figma.com/design/Ra16pJ3hDFiqIYCcg0X49O/Flower?node-id=0-1

## Технології

- **Фронтенд:** React 19, Vite 8, CSS (змінні, світла й темна теми)
- **Стан і дані:** `useState`, `useEffect`, `fetch` до власного API, збереження теми в `localStorage`
- **Сервер:** Node.js, Express 5, CORS (`server/`); на хостингу той самий застосунок працює як Netlify Function (`netlify/functions/api.js`)
- **Зображення й шрифти:** AVIF/WebP через `sharp`, локальні шрифти Lobster і Baskervville SC
- **PWA:** `manifest.json`, іконки 192/512/maskable, service worker (кеш оболонки та API, робота офлайн)
- **Якість:** oxlint, `node:test`, Lighthouse, axe-core
- **Публікація:** GitHub + Netlify (автодеплой при кожному push у `main`)

## Запуск локально

Потрібен Node.js 20.19+. Два термінали:

```bash
# термінал 1: API-сервер (http://localhost:3000)
cd server
npm install
npm start

# термінал 2: фронтенд (http://localhost:5173)
npm install
npm run dev
```

Перевірка збірки: `npm run build`, потім `npm run preview` (запити до `/api` переспрямовуються на локальний сервер).

## Публікація й PWA

Інструкція з деплою на Netlify, налаштування змінних середовища та перевірка PWA: [docs/DEPLOY.md](docs/DEPLOY.md).

## Структура

```
netlify.toml           збірка, правило /api/* → функція, заголовки
netlify/functions/     Netlify Function: запускає Express-застосунок із папки server
server/                Express API: GET /api/projects, GET /api/projects/:id, POST /api/contact
public/                manifest.json, sw.js, іконки, шрифти, оптимізовані зображення
scripts/               стиснення зображень, створення іконок, шаблон Open Graph
src/components/        Header, Hero, Section, Card, CategoryFilter, ContactForm, Footer тощо
src/api.js             запити до API
src/utils/             перевірка телефону й тести
docs/                  звіти практичних і інструкції
```

## Команди

| Команда | Що робить |
|---|---|
| `npm run dev` | сервер розробки |
| `npm run build` / `npm run preview` | збірка й перегляд збірки |
| `npm test` | тести перевірки телефону |
| `cd server && npm test` | тести маршрутів API |
| `npm run images` | стиснення фото з `src/assets/photos-src` у AVIF/WebP |
| `npm run icons` | створення PWA-іконок |
| `npm run lint` | перевірка коду |

## Документація

- [AI-NOTES.md](AI-NOTES.md): робота з AI-асистентом
- [docs/PERFORMANCE.md](docs/PERFORMANCE.md): оптимізація за Lighthouse
- [docs/ACCESSIBILITY-SEO.md](docs/ACCESSIBILITY-SEO.md): SEO та доступність
- [TESTING.md](TESTING.md): тест-кейси й журнал дефектів
- [docs/DEPLOY.md](docs/DEPLOY.md): деплой і PWA
