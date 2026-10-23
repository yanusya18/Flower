// Кнопки фільтра: активну категорію й обробник змін передає App (крок 5)
function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="filter" role="group" aria-label="Категорії карток">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`chip${category.id === active ? ' chip--active' : ''}`}
          aria-pressed={category.id === active}
          onClick={() => onChange(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
