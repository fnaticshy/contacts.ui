import Vue from 'vue';
import Vuex from 'vuex';

import common from './common';
import user from './user';
import contacts from './contacts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    common,
    contacts,
  },
});
