import { useState } from 'react'

// Контрольована форма: значення поля зберігається у стані (крок 6–7)
function ContactForm() {
  const [name, setName] = useState('')
  const cleanName = name.trim()

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
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
    </form>
  )
}

export default ContactForm
