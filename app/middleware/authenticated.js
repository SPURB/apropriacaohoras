export default async ({ store, route }) => {

	const isLogged = store.state.usuario.id > 0
	const isAdmin = store.state.usuario.admin

	if (!isLogged && route.path !== '/login') {
		store.app.router.replace('/login')
	}

	else if (!isAdmin && route.path === '/admin') {
		store.app.router.replace('/login')
  }
}
