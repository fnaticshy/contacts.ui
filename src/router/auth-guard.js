import store from '../store/index';

export default async function (to, from, next) {
  if (store.getters.user || store.getters.savedUserId) {
    next();
  } else {
    next('/login?loginError=true');
  }
}
