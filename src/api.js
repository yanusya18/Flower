// Адреса API: за замовчуванням локальний Express-сервер із папки server
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options)
  if (!response.ok) {
    throw new Error(`Сервер відповів зі статусом ${response.status}`)
  }
  return response.json()
}

// Крок 7: картки беремо з відповіді сервера
export function getProjects(signal) {
  return request('/api/projects', { signal })
}

// Крок 8: форма надсилає дані на POST /api/contact
export function sendContact(data) {
  return request('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
