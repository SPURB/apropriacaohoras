export default async ({ store, route }) => {
  const isLogged = JSON.parse(localStorage.getItem('credencial'))

  const noLoginRequiredPaths = path => /([/faq$]+\/)(.*)|(faq$)|(reset$)/gim.test(path) // testes: /faq/, /faq/page e reset/

  if (noLoginRequiredPaths(route.path)) return

  if (!isLogged || !isLogged.usuario.token) {
    if (route.path !== '/') store.app.router.replace('/')
  } else {
    const isAdmin = isLogged.usuario.admin
    if (!isAdmin && route.path === '/admin') store.app.router.replace('/')
  }
}
