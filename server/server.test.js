const { test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const app = require('./server.js')

let server
let base

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve) // порт 0: система сама обере вільний
  })
  base = `http://localhost:${server.address().port}`
})

after(() => server.close())

const postJson = (body) =>
  fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })

test('GET /api/projects повертає масив із 4 проєктів', async () => {
  const res = await fetch(`${base}/api/projects`)
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.length, 4)
  for (const key of ['id', 'category', 'icon', 'title', 'text']) {
    assert.ok(key in data[0], `немає поля ${key}`)
  }
})

test('GET /api/projects/:id повертає один проєкт', async () => {
  const res = await fetch(`${base}/api/projects/2`)
  assert.equal(res.status, 200)
  assert.equal((await res.json()).title, 'Полив')
})

test('GET /api/projects/:id дає 404 для неіснуючого або некоректного id', async () => {
  for (const id of ['99', 'abc']) {
    const res = await fetch(`${base}/api/projects/${id}`)
    assert.equal(res.status, 404, id)
  }
})

test('POST /api/contact приймає коректні дані й повертає { ok: true }', async (t) => {
  t.mock.method(console, 'log', () => {}) // не засмічуємо вивід тестів
  const res = await postJson(JSON.stringify({ name: 'Катя', phone: '+380 50 123 45 67' }))
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true })
})

test('POST /api/contact відхиляє некоректний телефон і зламаний JSON', async () => {
  const badPhone = await postJson(JSON.stringify({ name: 'Катя', phone: '0501234567' }))
  assert.equal(badPhone.status, 400)
  const brokenJson = await postJson('{"name":')
  assert.equal(brokenJson.status, 400)
})

test('CORS: відповідь дозволяє запити з іншого джерела', async () => {
  const res = await fetch(`${base}/api/projects`, { headers: { Origin: 'http://localhost:5173' } })
  assert.equal(res.headers.get('access-control-allow-origin'), '*')
})
