// Netlify Function: запускає той самий Express-застосунок, що й локально (папка server).
// Запити /api/* сюди переспрямовує netlify.toml.
import express from 'express'
import serverless from 'serverless-http'
import app from '../../server/server.js'

// Залежно від способу виклику шлях може бути /api/... або /.netlify/functions/api/...;
// приводимо його до /api/..., який очікують маршрути Express.
const api = express()
api.use((req, res, next) => {
  req.url = req.url.replace(/^\/\.netlify\/functions\/api/, '')
  if (!req.url.startsWith('/api')) req.url = `/api${req.url}`
  next()
})
api.use(app)

export const handler = serverless(api)
