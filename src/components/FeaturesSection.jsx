import Section from './Section.jsx'
import Picture from './Picture.jsx'

function FeaturesSection() {
  return (
    <Section id="features" title="Особливість квітки">
      <div className="split split--reverse">
        <p>
          Mirabilis jalapa відкривається переважно ввечері, коли сонце заходить, і наповнює повітря
          приємним, ніжним ароматом. Саме тому її називають «нічною красунею».
        </p>
        <Picture name="sunset" alt="Силуети квітів на тлі заходу сонця у фіолетових сутінках" />
      </div>
    </Section>
  )
}

export default FeaturesSection
