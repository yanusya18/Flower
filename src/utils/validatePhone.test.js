import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizePhone, validatePhone } from './validatePhone.js'

test('normalizePhone прибирає пробіли, дефіси й дужки', () => {
  assert.equal(normalizePhone('+38(050) 123-45-67'), '+380501234567')
})

test('коректні номери проходять перевірку', () => {
  for (const value of ['+380501234567', '+380 50 123 45 67', '+38(050)123-45-67']) {
    assert.equal(validatePhone(value), '', value)
  }
})

test('порожнє значення дає окреме повідомлення', () => {
  assert.equal(validatePhone(''), 'Введіть номер телефону')
  assert.equal(validatePhone('   '), 'Введіть номер телефону')
})

test('некоректні номери відхиляються', () => {
  const invalid = [
    '0501234567', // без коду країни
    '+380 50 123 45', // замало цифр
    '+3805012345678', // забагато цифр
    '+38050abc4567', // літери
    '+48501234567', // інша країна
    '380501234567', // без плюса
    '++380501234567', // зайвий плюс
  ]
  for (const value of invalid) {
    assert.match(validatePhone(value), /^Формат:/, value)
  }
})
