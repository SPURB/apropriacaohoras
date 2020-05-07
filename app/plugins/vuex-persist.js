import VuexPersistence from 'vuex-persist'
 
export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
			reducer: (state) => ({ usuario: state.usuario }),
      key: 'credencial',
      storage: window.localStorage
    }).plugin(store);
  });
}