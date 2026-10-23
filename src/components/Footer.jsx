import navLinks from '../data/navLinks.js'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__brand">Mirabilis jalapa</p>
      <ul className="nav nav--footer">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a className="nav__link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="footer__tagline">Екзотична квітка, яка дарує красу навіть у темряві.</p>
      <p className="footer__copy">&copy; 2026 L&rsquo;Heure Bleue</p>
    </footer>
  )
}

export default Footer
