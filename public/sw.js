// Простий service worker: кешує оболонку сайту (головну сторінку, іконки, маніфест),
// стилі, скрипти, шрифти та зображення, а також відповідь GET /api/projects.
const CACHE = 'flower-v1'
const SHELL = ['./', 'manifest.json', 'favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  )
})

// Видаляємо кеші старих версій і беремо під контроль відкриті вкладки
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

async function putInCache(request, response) {
  if (response.ok && response.type === 'basic') {
    const cache = await caches.open(CACHE)
    await cache.put(request, response.clone())
  }
  return response
}

// Спочатку мережа (свіжі дані); без мережі беремо збережену копію
async function networkFirst(request, fallbackUrl) {
  try {
    return await putInCache(request, await fetch(request))
  } catch (error) {
    const cached = (await caches.match(request)) || (fallbackUrl && (await caches.match(fallbackUrl)))
    if (cached) return cached
    throw error
  }
}

// Одразу зі збереженої копії, а в фоні оновлюємо її
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request)
  const update = fetch(request)
    .then((response) => putInCache(request, response))
    .catch(() => cached)
  return cached || update
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Обробляємо лише GET-запити до свого домену: POST форми та сторонні адреси не чіпаємо
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, './'))
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request))
  } else {
    event.respondWith(staleWhileRevalidate(request))
  }
})
