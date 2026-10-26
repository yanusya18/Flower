import Section from './Section.jsx'

const facts = [
  { emoji: '🌙', text: 'Цвіте ввечері' },
  { emoji: '🌸', text: 'Має ніжні лілієподібні квіти' },
  { emoji: '🌿', text: 'Походить із тропічних регіонів Америки' },
]

function AboutSection() {
  return (
    <Section id="about" title="Що це за квітка?">
      <p className="lead">
        Mirabilis jalapa — це екзотична багаторічна рослина, відома своїми яскравими квітами, які
        розкриваються ввечері.
      </p>
      <ul className="tags">
        {facts.map((fact) => (
          <li className="tag" key={fact.text}>
            <span aria-hidden="true">{fact.emoji}</span> {fact.text}
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default AboutSection
