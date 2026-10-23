import navLinks from '../data/navLinks.js'

// theme і onToggleTheme приходять з App, де живе стан теми (крок 4)
function Header({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href="#top">
          L&rsquo;Heure Bleue
        </a>
        <div className="header__controls">
          <nav aria-label="Головне меню">
            <ul className="nav">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a className="nav__link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-pressed={isDark}
          >
            {isDark ? 'Світла тема' : 'Темна тема'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
