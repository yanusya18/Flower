# Публікація на Netlify та PWA

Практичне заняття № 26. Інструкція для Netlify.

## Що вже підготовлено в репозиторії

| Файл | Призначення |
|---|---|
| `netlify.toml` | Команда збірки `npm run build`, каталог `dist`, Node 22, налаштування функції, правило `/api/*` → функція, заголовки кешування |
| `netlify/functions/api.js` | Netlify Function: запускає той самий Express-сервер із папки `server` (через `serverless-http`) |
| `public/manifest.json` | PWA-маніфест: name, short_name, start_url, display: standalone, theme_color, іконки 192 і 512 (+ maskable) |
| `public/icons/` | Іконки застосунку (створюються командою `npm run icons`) |
| `public/sw.js` | Service worker: кешує головну сторінку, іконки, стилі, скрипти, шрифти, зображення та відповідь `GET /api/projects` |
| `src/main.jsx` | Реєструє service worker (лише у збірці для публікації) |
| `index.html` | `<link rel="manifest">`, `apple-touch-icon`, `<meta name="theme-color">` |

**Чому потрібна функція.** Express-сервер на `localhost:3000` недоступний відвідувачам опублікованого сайту. Тому збірка для публікації звертається до `/api/...` свого домену, а `netlify.toml` переспрямовує ці запити до функції `api`. Локально нічого не змінюється: `npm run dev` ходить на `localhost:3000`, а `npm run preview` проксіює `/api` на локальний сервер.

## Крок 1. Підготовка репозиторію

Результат перевірки:

- Секретів (токенів, паролів, ключів) у файлах немає. У `.env` лише публічна адреса сайту; справжні секрети тримайте у `.env.local` (він ігнорується Git).
- `node_modules`, `dist`, `.netlify` та `*.log` вказані в `.gitignore` і не потрапляють у репозиторій.
- Найбільші файли: чотири HTML-звіти Lighthouse у `docs/lighthouse/` (~3 МБ разом). Їх можна залишити як докази до практичних 23–24 або видалити, залишивши скриншоти PNG.
- README містить опис, технології й місця для посилань.

Запуште зміни в `main`:

```bash
git add .
git commit -m "Switch deployment to Netlify"
git branch -M main
git push -u origin main
```

## Кроки 2–4. Імпорт і публікація

Назви кнопок у Netlify можуть трохи відрізнятися від наведених.

1. Увійдіть у Netlify через GitHub.
2. **Add new site (або Add new project) → Import an existing project → GitHub**, виберіть репозиторій `Flower`.
3. Налаштування збірки зазвичай підтягуються з `netlify.toml` автоматично. Перевірте:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Відкрийте **Environment variables** (або додайте їх пізніше в Site configuration → Environment variables) і створіть `VITE_SITE_URL` зі значенням адреси сайту, наприклад `https://flower.netlify.app`. Точну адресу ви дізнаєтесь після першого деплою: тоді змініть значення і запустіть **Deploys → Trigger deploy → Clear cache and deploy site**. Від цієї змінної залежать `canonical` та Open Graph.
5. Натисніть **Deploy**, дочекайтесь зеленого статусу «Published» і відкрийте посилання.
6. Перевірте сайт: картки в розділі «Догляд» мають завантажитись. Окремо відкрийте `https://ваш-сайт/api/projects`: має відобразитись JSON. Форма контактів працює, а повідомлення потрапляє в журнал функції (**Logs → Functions**), без збереження.
7. За бажанням змініть адресу: **Site configuration → General → Site details → Change site name**.

## Крок 5. Перевірка автодеплою

1. Змініть щось помітне, наприклад заголовок у `src/components/Hero.jsx`.
2. Зробіть коміт і `git push` у `main`.
3. У Netlify відкрийте вкладку **Deploys**: з'явиться новий деплой. Після завершення оновіть сайт.
4. Якщо бачите стару версію, це service worker віддає копію з кешу: оновіть сторінку ще раз або натисніть Shift+F5. Щоб примусово скинути кеш усім користувачам, змініть `CACHE = 'flower-v1'` у `public/sw.js` на `flower-v2`.

Гілки й pull request отримують окремі «Deploy Preview», а публікація у production відбувається з гілки `main`.

## Кроки 6–9. PWA: що перевіряти

1. Відкрийте опублікований сайт у Chrome, F12, вкладка **Application**.
2. **Manifest:** розділ Identity (name, short name), Presentation (display: standalone, theme color), Icons (192, 512, maskable), а внизу Installability має бути без помилок.
3. **Service workers:** статус «activated and is running», scope — корінь сайту.
4. **Cache Storage → flower-v1:** мають бути головна сторінка, стилі, скрипт, іконки, `/api/projects`.
5. **Network → Offline → перезавантажити:** сторінка й картки мають відкритись без мережі.
6. У адресному рядку Chrome з'явиться значок встановлення (або меню ⋮ → «Встановити застосунок»).

Lighthouse у версіях від 12 не має окремої категорії PWA, тому готовність до встановлення перевіряйте у вкладці Application.

## Що перевірено мною і що ні

Перевірено:

- Функцію зібрано тим самим пакувальником, що й Netlify при деплої (esbuild, `express` як зовнішній модуль), і запущено результат: `GET /api/projects`, `/api/projects/:id`, 404, `POST /api/contact` (коректні й некоректні дані) працюють для обох форм шляху (`/api/...` і `/.netlify/functions/api/...`).
- У Chromium (імітація хостингу: статика з `dist` + API на тому ж домені): маніфест без помилок, Chromium не повідомляє про проблеми встановлення, service worker активний, сторінка й картки відкриваються офлайн, форма надсилається онлайн і чесно показує помилку офлайн.

Не перевірено:

- **Реальний деплой на Netlify**: я не маю доступу до вашого акаунта.
- **Правило переспрямування `/api/*`** на живому сайті: повний `netlify dev` не вдалося запустити в моєму середовищі. Правило відповідає документації Netlify для Express, але підтвердіть його, відкривши `/api/projects` після деплою.

## Додаткове завдання

- **Власний домен.** Site configuration → Domain management → Add a domain. Додайте записи DNS, які покаже Netlify; HTTPS-сертифікат випускається автоматично. Після цього змініть `VITE_SITE_URL` на новий домен.
- **Встановлення на телефон.** Android Chrome: меню ⋮ → «Встановити застосунок». iPhone Safari: «Поділитись» → «На екран Додому» (для iOS використовується `apple-touch-icon`). Додайте скриншот до README.

## Типові проблеми

| Симптом | Причина й рішення |
|---|---|
| `/api/projects` повертає 404 або сторінку сайту | Файл `netlify.toml` не закомічений або лежить не в корені репозиторію. Перевірте Deploys → останній деплой → Functions: там має бути функція `api` |
| Картки показують помилку | Подивіться Logs → Functions: помилка функції. Перевірте, що `express`, `cors` і `serverless-http` є в кореневому `package.json` |
| `canonical` та `og:image` вказують на `localhost` | Не задано `VITE_SITE_URL` у Netlify: додайте змінну й запустіть деплой із очищенням кешу |
| Після деплою видно стару версію | Кеш service worker: перезавантажте двічі або піднімайте версію `CACHE` |
| Збірка падає з помилкою Node | Перевірте, що в `netlify.toml` вказано `NODE_VERSION = "22"` |
