import Section from './Section.jsx'
import Picture from './Picture.jsx'

function HistorySection() {
  return (
    <Section id="history" title="Історія" tone="muted">
      <div className="split">
        <Picture name="hill" alt="Туманний пагорб, вкритий синіми квітами, під фіолетовим небом" />
        <div>
          <p>
            Mirabilis jalapa походить із тропічних регіонів Центральної та Південної Америки. У
            Європу вона потрапила у XVI столітті, де швидко завоювала популярність завдяки своїй
            незвичайній красі та здатності цвісти ввечері.
          </p>
          <blockquote className="quote">
            «У деяких культурах цю квітку вважають символом любові та таємниці.»
          </blockquote>
        </div>
      </div>
    </Section>
  )
}

export default HistorySection
