export default function ({ store, redirect }) {
  if (!store.state.usuario.id) {
    return redirect('/login')
	}
}
