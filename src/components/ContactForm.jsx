import { useState } from 'react'
import { normalizePhone, validatePhone } from '../utils/validatePhone.js'
import { sendContact } from '../api.js'

// Контрольована форма: значення полів зберігаються у стані
function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const cleanName = name.trim()

  // Помилка показується лише після першого виходу з поля або спроби надсилання
  const phoneError = validatePhone(phone)
  const visiblePhoneError = touched ? phoneError : ''

  // Крок 8: коректну форму надсилаємо на POST /api/contact
  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (phoneError) return

    setStatus('sending')
    try {
      await sendContact({ name: cleanName, phone: normalizePhone(phone) })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label className="form__label" htmlFor="name">
        Ім&rsquo;я <span className="form__hint">(необов&rsquo;язково)</span>
      </label>
      <input
        className="form__input"
        id="name"
        type="text"
        autoComplete="given-name"
        maxLength={100}
        placeholder="Як до вас звертатися?"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
          setStatus('idle')
        }}
      />
      <p className="form__greeting" aria-live="polite">
        {cleanName
          ? `Привіт, ${cleanName}! Раді бачити вас у L’Heure Bleue.`
          : 'Введіть ім’я, і тут з’явиться привітання.'}
      </p>

      <label className="form__label" htmlFor="phone">
        Телефон <span className="form__hint">(обов&rsquo;язково)</span>
      </label>
      <input
        className="form__input"
        id="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+380501234567"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value)
          setStatus('idle')
        }}
        onBlur={() => setTouched(true)}
        aria-required="true"
        aria-invalid={visiblePhoneError ? 'true' : 'false'}
        aria-describedby="phone-error"
      />
      <p className="form__error" id="phone-error" role="alert">
        {visiblePhoneError}
      </p>

      <button className="button button--submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Надсилання…' : 'Надіслати'}
      </button>
      {status === 'sent' && (
        <p className="form__success" role="status">
          Дякуємо! Повідомлення надіслано.
        </p>
      )}
      {status === 'error' && (
        <p className="form__error form__error--submit" role="alert">
          Не вдалося надіслати повідомлення. Перевірте, що сервер запущено, і спробуйте ще раз.
        </p>
      )}
    </form>
  )
}

export default ContactForm
