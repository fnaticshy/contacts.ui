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
      apiKey: 'AIzaSyA6teSWGuXKG7MS5xTcQcqPd24sht3jryQ',
      authDomain: 'todo-test-ui-30d09.firebaseapp.com',
      databaseURL: 'https://todo-test-ui-30d09.firebaseio.com',
      projectId: 'todo-test-ui-30d09',
      storageBucket: 'todo-test-ui-30d09.appspot.com',
      messagingSenderId: '288202129076',
      appId: '1:288202129076:web:244e8197cec4c399fd21e1',
    };
    fb.initializeApp(firebaseConfig);

    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });
  },
}).$mount('#app');
