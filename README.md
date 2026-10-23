# portfolio-react

Практичні заняття № 19–20. React: компоненти, props, useState та події (L'Heure Bleue, Mirabilis jalapa).

## Запуск

```bash
npm install
npm run dev
```

## Структура

```
src/
├── main.jsx              точка входу
├── App.jsx               масив projects і збірка сторінки
├── index.css             токени, базові стилі та стилі компонентів
├── data/navLinks.js      посилання меню (Header і Footer)
├── assets/icons/         іконки карток
└── components/
    ├── Header.jsx
    ├── Hero.jsx
    ├── Section.jsx       секція з title і children (додаткове завдання)
    ├── Card.jsx          props: title, text, image; стан лічильника вподобань
    ├── CategoryFilter.jsx кнопки фільтра карток
    ├── ContactForm.jsx   контрольоване поле імені та привітання
    └── Footer.jsx
```

## Інтерактивність (Практичне 20)

| Що | Де живе стан |
|---|---|
| Лічильник вподобань | `Card.jsx`: `count`, власний у кожної картки |
| Перемикач теми | `App.jsx`: `theme` (клас `theme-light` / `theme-dark` на кореневому елементі) |
| Фільтр карток | `App.jsx`: `category`, список через `projects.filter(...)` |
| Контрольована форма | `ContactForm.jsx`: `name`, привітання виводиться під полем |
| Збереження теми | `useEffect` + `localStorage` (додаткове завдання) |
