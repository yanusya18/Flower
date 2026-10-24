import Picture from './Picture.jsx'

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Mirabilis jalapa</p>
          <h1 className="hero__title">Квітка, що розквітає разом із вечором</h1>
          <p className="hero__text">
            Mirabilis jalapa — екзотична багаторічна рослина з яскравими квітами, які розкриваються
            ввечері. Її часто називають «нічною красунею» за здатність оживати з настанням сутінків.
          </p>
          <a className="button" href="#care">
            Дізнатися більше
          </a>
        </div>
        <div className="hero__media">
          <Picture name="macro" alt="Фіолетова квітка Mirabilis jalapa з жовтими бутонами в сутінках" priority />
        </div>
      </div>
    </section>
  )
}

export default Hero
