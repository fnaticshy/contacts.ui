<template>
  <v-app style="overflow: hidden;">
    <v-navigation-drawer
      color="#0b4f6c"
      dark
      app
      temporary
      v-model="drawer"
    >
      <v-list>
        <template v-if="isUserLoggedIn || savedUserId">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ savedUserNick || user.nick }}</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item
            :to="link.url"
            v-for="link of links"
            :key="link.title"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="#0b4f6c"
      dark
      :app="true"
    >
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="pointer-none">
          Contacts App
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <template v-if="isUserLoggedIn || savedUserId">
          <div class="d-flex align-center pr-3">
            <div>Logged as: {{ savedUserNick || user.nick }}</div>
          </div>
          <v-btn
            text
            tile
            height="100%"
            @click="onLogout"
          >
            <v-icon left>
              mdi-logout
            </v-icon>
            Logout
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            text
            tile
            v-for="link of links"
            :to="link.url" height="100%"
            :key="link.title"
          >
            <v-icon left>{{ link.icon }}</v-icon>
            {{ link.title }}
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <v-content style="position: fixed; left: 0; right: 0;">
      <router-view v-if="!loading"></router-view>
      <div v-else class="loader">
        <v-progress-circular
          :size="70"
          color="#6a9b9b"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-content>

    <template v-if="error">
      <v-snackbar
        color="#0b4f6c"
        :multi-line="true"
        :timeout="5000"
        :value="true"
        @input="closeError"
      >
        {{ error }}
        <v-btn
          color="white"
          dark
          text
          @click="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
    savedUserId() {
      return this.$store.getters.savedUserId;
    },
    savedUserNick() {
      return this.$store.getters.savedUserNick;
    },
    error() {
      // ловим проброс ошибки из user.js
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (!this.savedUserId || !this.isUserLoggedIn) {
        return [
          {
            title: 'Login',
            icon: 'mdi-lock',
            url: '/login',
          },
          {
            title: 'Registration',
            icon: 'mdi-face',
            url: '/registration',
          },
        ];
      }
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
    onLogout() {
      this.$router.push('/login');
      this.$store.dispatch('logoutUser');
      this.$store.dispatch('clearContacts');
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style lang="scss">
/*colors*/
/*#122c34 #0b4f6c #2978A0 #006476 #4ea5d9 #09d0cc #6a9b9b*/
main {
  background: linear-gradient(256deg, #004053, #095c58, #304747, #262626);
  background-size: 800% 800%;

  -webkit-animation: AnimationName 9s ease infinite;
  -moz-animation: AnimationName 9s ease infinite;
  -o-animation: AnimationName 9s ease infinite;
  animation: AnimationName 9s ease infinite;
  height: 100vh;
  overflow: hidden;
}
@-webkit-keyframes AnimationName {
  0% {
    background-position: 64% 0%;
  }
  50% {
    background-position: 37% 100%;
  }
  100% {
    background-position: 64% 0%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 64% 0%;
  }
  50% {
    background-position: 37% 100%;
  }
  100% {
    background-position: 64% 0%;
  }
}
@-o-keyframes AnimationName {
  0% {
    background-position: 64% 0%;
  }
  50% {
    background-position: 37% 100%;
  }
  100% {
    background-position: 64% 0%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 64% 0%;
  }
  50% {
    background-position: 37% 100%;
  }
  100% {
    background-position: 64% 0%;
  }
}
.pointer {
  cursor: pointer;
}
.pointer-none {
  cursor: default;
}
.loader {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #122c34;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
}
</style>
