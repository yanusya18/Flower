import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import Card from './components/Card.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

import sunIcon from './assets/icons/sun.svg'
import dropIcon from './assets/icons/drop.svg'
import sproutIcon from './assets/icons/sprout.svg'
import thermometerIcon from './assets/icons/thermometer.svg'

// Категорії для фільтра
const categories = [
  { id: 'all', label: 'Усі' },
  { id: 'light-water', label: 'Світло й вода' },
  { id: 'soil-climate', label: 'Ґрунт і клімат' },
]

// Масив даних для карток; у кожної є category для фільтра
const projects = [
  {
    id: 1,
    category: 'light-water',
    title: 'Освітлення',
    text: 'Любить яскраве світло, але добре росте і в півтіні.',
    image: sunIcon,
  },
  {
    id: 2,
    category: 'light-water',
    title: 'Полив',
    text: 'Регулярний, без застою води в ґрунті.',
    image: dropIcon,
  },
  {
    id: 3,
    category: 'soil-climate',
    title: 'Ґрунт',
    text: 'Легкий, родючий, з добрим дренажем.',
    image: sproutIcon,
  },
  {
    id: 4,
    category: 'soil-climate',
    title: 'Температура',
    text: 'Оптимально 18–28 °C. Не любить сильну спеку та холод.',
    image: thermometerIcon,
  },
]

// Додаткове завдання: тема зберігається в localStorage
const THEME_KEY = 'theme'

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light' // сховище недоступне — стартуємо зі світлої теми
  }
}

function App() {
  const [theme, setTheme] = useState(getStoredTheme)
  const [category, setCategory] = useState('all')

  // Зберігаємо вибрану тему після кожної зміни
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // сховище недоступне — тема просто не збережеться
    }
  }, [theme])

  const visibleProjects = projects.filter(
    (project) => category === 'all' || project.category === category,
  )

  return (
    <div className={`app theme-${theme}`}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <main>
        <Hero />
        <Section id="care" title="Догляд">
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          <div className="cards">
            {visibleProjects.map((project) => (
              <Card key={project.id} {...project} />
            ))}
          </div>
        </Section>
        <Section id="contacts" title="Контакти" tone="muted">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </div>
  )
}

export default App
