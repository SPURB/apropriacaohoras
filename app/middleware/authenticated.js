export default async ({ store, route }) => {
  const credencial = JSON.parse(localStorage.getItem('credencial-user'))

  if (!credencial) {
    store.app.router.replace('/login')
  } else {
    const token = credencial.usuario.token
    if (token === "" && route.path !== '/login') store.app.router.replace('/login')
    if (token !== "" && route.path === '/login') store.app.router.replace('/registrar')
  } 
}
