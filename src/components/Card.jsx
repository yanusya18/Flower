import { useState } from 'react'

// Одна картка догляду. Дані приходять через props: title, text, image; hidden ховає картку при фільтрації.
// Лічильник вподобань — власний стан кожної картки (крок 1–3).
function Card({ title, text, image, hidden = false }) {
  const [count, setCount] = useState(0)

  return (
    <article className="card" hidden={hidden}>
      <div className="card__head">
        <img className="card__icon" src={image} alt="" width="28" height="28" />
        <h3 className="card__title">{title}</h3>
      </div>
      <p className="card__text">{text}</p>
      <button
        type="button"
        className="like"
        onClick={() => setCount(count + 1)}
        aria-label={`Вподобати «${title}». Вподобань: ${count}`}
      >
        <span className="like__icon" aria-hidden="true">
          ♥
        </span>
        <span className="like__count">{count}</span>
      </button>
    </article>
  )
}

export default Card
