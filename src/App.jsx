import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import AboutSection from './components/AboutSection.jsx'
import HistorySection from './components/HistorySection.jsx'
import FeaturesSection from './components/FeaturesSection.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import Card from './components/Card.jsx'
import ContactForm from './components/ContactForm.jsx'
import { getProjects } from './api.js'
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

// Іконки: сервер повертає лише ключ (icon), а самі файли лежать у фронтенді
const icons = {
  sun: sunIcon,
  drop: dropIcon,
  sprout: sproutIcon,
  thermometer: thermometerIcon,
}

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
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [attempt, setAttempt] = useState(0)

  // Крок 7: завантажуємо картки з власного API; AbortController скасовує запит при розмонтуванні
  useEffect(() => {
    const controller = new AbortController()
    getProjects(controller.signal)
      .then((data) => {
        setProjects(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error')
      })
    return () => controller.abort()
  }, [attempt])

  function retry() {
    setStatus('loading')
    setAttempt(attempt + 1)
  }

  // Зберігаємо вибрану тему після кожної зміни й передаємо її елементу <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // сховище недоступне — тема просто не збережеться
    }
  }, [theme])

  // Фільтр: id карток, які треба показати. Приховані картки не видаляємо з дерева
  // (атрибут hidden), щоб їхні лічильники вподобань не скидалися при зміні фільтра.
  const visibleIds = new Set(
    projects
      .filter((project) => category === 'all' || project.category === category)
      .map((project) => project.id),
  )

  return (
    <div className={`app theme-${theme}`}>
      <a className="skip-link" href="#main">
        Перейти до основного вмісту
      </a>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <main id="main" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <HistorySection />
        <FeaturesSection />
        <Section id="care" title="Догляд" tone="muted">
          {status === 'loading' && (
            <p className="status" role="status">
              Завантаження…
            </p>
          )}
          {status === 'error' && (
            <div className="status status--error" role="alert">
              <p>
                Не вдалося завантажити дані. Перевірте, що сервер запущено: <code>npm start</code>{' '}
                у папці <code>server</code>.
              </p>
              <button type="button" className="chip" onClick={retry}>
                Спробувати ще раз
              </button>
            </div>
          )}
          {status === 'ready' && (
            <>
              <CategoryFilter categories={categories} active={category} onChange={setCategory} />
              <div className="cards">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    {...project}
                    image={icons[project.icon]}
                    hidden={!visibleIds.has(project.id)}
                  />
                ))}
              </div>
            </>
          )}
        </Section>
        <Section id="contacts" title="Контакти">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </div>
  )
}

export default App
