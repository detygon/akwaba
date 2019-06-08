const Menu = [
  { header: 'Main menu' },
  {
    title: 'Dashboard',
    group: 'main',
    icon: 'dashboard',
    name: 'dashboard',
  },
  {
    title: 'Form',
    group: 'main',
    icon: 'dashboard',
    items: [
      { title: 'Show all', component: 'forms', name: 'forms' },
      { title: 'Add new', component: 'new-form', name: 'new-form' },
    ],
  },
]

Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase()
      let textB = y.title.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
  }
})

export default Menu
