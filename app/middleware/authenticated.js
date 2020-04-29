export default async ({ store, route }) => {
	if (!store.state.usuario.id && route.path !== '/login') {
		store.app.router.replace('/login')
	}
}
