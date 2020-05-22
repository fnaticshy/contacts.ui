import Vue from 'vue';
import * as fb from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAwk9UFVxX3PnHhCYF51c-Lj9SPIyaFW8s',
      authDomain: 'contacts-ui-c1752.firebaseapp.com',
      databaseURL: 'https://contacts-ui-c1752.firebaseio.com',
      projectId: 'contacts-ui-c1752',
      storageBucket: 'contacts-ui-c1752.appspot.com',
      messagingSenderId: '227523823881',
      appId: '1:227523823881:web:b97609d674ce7c2ca32bd8',
    };
    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
  },
}).$mount('#app');
