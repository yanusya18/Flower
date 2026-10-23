// Секція з пропом title і вкладеним вмістом через children (додаткове завдання Практичного 19)
function Section({ id, title, tone, children }) {
  return (
    <section className={`section${tone ? ` section--${tone}` : ''}`} id={id}>
      <div className="section__inner">
        <h2 className="section__title">{title}</h2>
        {children}
      </div>
    </section>
  )
}

export default Section
