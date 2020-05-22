<template>
  <v-container class="background fill-height" fluid>
    <v-row :no-gutters="true" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="#0b4f6c" dark flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                :rules="emailRules"
                v-model="email"
              />

              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                counter="6"
                :rules="passwordRules"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :depressed="true"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/contacts');
          })
          .catch(() => {});
      }
    },
  },
  created() {
    if (this.$route.query.loginError) {
      this.$store.dispatch('setError', 'Please log in to access this page.');
    }
  },
};
</script>

<style scoped>
  .background {
    background: linear-gradient(15deg, #6a9b9b 50%, #4ea5d9 50.1%)
  }
</style>
