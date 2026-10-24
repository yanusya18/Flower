const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

// Масив projects (крок 3): у проєкті Flower це картки догляду за квіткою.
// Поле icon — ключ іконки, яку фронтенд підставляє в картку.
const projects = [
  {
    id: 1,
    category: 'light-water',
    icon: 'sun',
    title: 'Освітлення',
    text: 'Любить яскраве світло, але добре росте і в півтіні.',
  },
  {
    id: 2,
    category: 'light-water',
    icon: 'drop',
    title: 'Полив',
    text: 'Регулярний, без застою води в ґрунті.',
  },
  {
    id: 3,
    category: 'soil-climate',
    icon: 'sprout',
    title: 'Ґрунт',
    text: 'Легкий, родючий, з добрим дренажем.',
  },
  {
    id: 4,
    category: 'soil-climate',
    icon: 'thermometer',
    title: 'Температура',
    text: 'Оптимально 18–28 °C. Не любить сильну спеку та холод.',
  },
]

// Формат телефону такий самий, як у формі на фронтенді: +380XXXXXXXXX
const PHONE_PATTERN = /^\+380\d{9}$/

app.use(cors()) // крок 6: дозволяє фронтенду з іншого порту звертатись до API
app.use(express.json()) // крок 5: розбирає JSON у req.body

// Крок 3: усі проєкти
app.get('/api/projects', (req, res) => res.json(projects))

// Додаткове завдання: один проєкт за id, 404 для неіснуючого
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find((p) => p.id === Number(req.params.id))
  if (!project) {
    return res.status(404).json({ error: 'Проєкт не знайдено' })
  }
  res.json(project)
})

// Крок 5: приймає дані форми, виводить у консоль сервера й повертає { ok: true }
app.post('/api/contact', (req, res) => {
  const { name = '', phone = '' } = req.body ?? {}

  if (typeof name !== 'string' || typeof phone !== 'string' || name.length > 100) {
    return res.status(400).json({ ok: false, error: 'Некоректні дані' })
  }

  const cleanPhone = phone.replace(/[\s\-()]/g, '')
  if (!PHONE_PATTERN.test(cleanPhone)) {
    return res.status(400).json({ ok: false, error: 'Телефон має бути у форматі +380XXXXXXXXX' })
  }

  // Навчальна заглушка: у справжньому проєкті тут було б збереження або надсилання листа
  console.log('Нове повідомлення з форми:', { name: name.trim(), phone: cleanPhone })
  res.json({ ok: true })
})

// Невідомий маршрут і помилки (наприклад, зламаний JSON) теж повертаємо як JSON
app.use((req, res) => res.status(404).json({ error: 'Маршрут не знайдено' }))

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  const status = err.status ?? 500
  if (status >= 500) console.error(err)
  res.status(status).json({ ok: false, error: status < 500 ? 'Некоректний запит' : 'Помилка сервера' })
})

// Сервер слухає порт лише коли файл запущено напряму (node server.js);
// під час тестів його підключають через require без запуску
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`)
  })
}

module.exports = app
