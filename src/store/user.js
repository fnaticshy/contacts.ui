import * as fb from 'firebase';

class User {
  constructor(id, nick) {
    this.id = id;
    this.nick = nick;
  }
}

export default {
  state: {
    user: null,
    savedUserId: localStorage.getItem('user'),
    savedUserNick: localStorage.getItem('nick'),
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeSavedData(state) {
      state.savedUserId = null;
      state.savedUserNick = null;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const resp = await fb.auth().createUserWithEmailAndPassword(email, password);
        const nickName = resp.user.email.split('@')[0];
        localStorage.setItem('user', resp.user.uid);
        localStorage.setItem('nick', nickName);
        commit('setUser', new User(resp.user.uid, nickName));
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    async loginUser({ commit, dispatch }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const resp = await fb.auth().signInWithEmailAndPassword(email, password);
        const nick = resp.user.email.split('@')[0];
        localStorage.setItem('user', resp.user.uid);
        localStorage.setItem('nick', nick);
        commit('setUser', new User(resp.user.uid, nick));
        dispatch('fetchContacts');
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    autoLoginUser({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('setUser', new User(payload.uid, payload.email.split('@')[0]));
      dispatch('fetchContacts');
      commit('setLoading', false);
    },
    logoutUser({ commit }) {
      commit('removeSavedData');
      localStorage.removeItem('user');
      localStorage.removeItem('nick');
      fb.auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    savedUserId(state) {
      return state.savedUserId;
    },
    savedUserNick(state) {
      return state.savedUserNick;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    },
  },
};
