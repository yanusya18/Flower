import Section from './Section.jsx'

const facts = ['🌙 Цвіте ввечері', '🌸 Має ніжні лілієподібні квіти', '🌿 Походить із тропічних регіонів Америки']

function AboutSection() {
  return (
    <Section id="about" title="Що це за квітка?">
      <p className="lead">
        Mirabilis jalapa — це екзотична багаторічна рослина, відома своїми яскравими квітами, які
        розкриваються ввечері.
      </p>
      <ul className="tags">
        {facts.map((fact) => (
          <li className="tag" key={fact}>
            {fact}
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default AboutSection
