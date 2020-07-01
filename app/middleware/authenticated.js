export default async ({ store, route }) => {
  const isLogged = JSON.parse(localStorage.getItem('credencial'))

  if (!isLogged || !isLogged.usuario.token) {
    if (route.path === '/reset') return
    if (route.path !== '/') store.app.router.replace('/')
  } else {
    const isAdmin = isLogged.usuario.admin
    if (!isAdmin && route.path === '/admin') store.app.router.replace('/')
  }
}