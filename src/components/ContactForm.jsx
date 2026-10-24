import { useState } from 'react'
import { validatePhone } from '../utils/validatePhone.js'

// Контрольована форма: значення полів зберігаються у стані
function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const cleanName = name.trim()

  // Помилка показується лише після першого виходу з поля або спроби надсилання
  const phoneError = validatePhone(phone)
  const visiblePhoneError = touched ? phoneError : ''

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    setSubmitted(phoneError === '')
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label className="form__label" htmlFor="name">
        Ім&rsquo;я
      </label>
      <input
        className="form__input"
        id="name"
        type="text"
        autoComplete="given-name"
        placeholder="Як до вас звертатися?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="form__greeting" aria-live="polite">
        {cleanName
          ? `Привіт, ${cleanName}! Раді бачити вас у L’Heure Bleue.`
          : 'Введіть ім’я, і тут з’явиться привітання.'}
      </p>

      <label className="form__label" htmlFor="phone">
        Телефон
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
          setSubmitted(false)
        }}
        onBlur={() => setTouched(true)}
        aria-invalid={visiblePhoneError ? 'true' : 'false'}
        aria-describedby="phone-error"
      />
      <p className="form__error" id="phone-error" role="alert">
        {visiblePhoneError}
      </p>

      <button className="button button--submit" type="submit">
        Надіслати
      </button>
      {submitted && <p className="form__success">Дякуємо! Номер прийнято.</p>}
    </form>
  )
}

export default ContactForm
