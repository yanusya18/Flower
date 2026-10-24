const PHONE_PATTERN = /^\+380\d{9}$/

// Прибираємо пробіли, дефіси й дужки: так номер можна вводити у зручному вигляді
export function normalizePhone(value) {
  return value.replace(/[\s\-()]/g, '')
}

// Повертає текст помилки або порожній рядок, якщо номер коректний
export function validatePhone(value) {
  const phone = normalizePhone(value)
  if (!phone) return 'Введіть номер телефону'
  return PHONE_PATTERN.test(phone) ? '' : 'Формат: +380XXXXXXXXX (9 цифр після +380)'
}
