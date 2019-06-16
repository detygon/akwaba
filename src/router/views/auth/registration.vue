<template>
  <v-app id="register" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="/static/m.png"
                    alt="Akwaba"
                    width="120"
                    height="120"
                  />
                  <h1 class="flex my-4 primary--text">Akwaba</h1>
                </div>
                <v-form>
                  <v-text-field
                    v-model="model.email"
                    append-icon="email"
                    label="Email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="model.username"
                    append-icon="person"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="model.password"
                    append-icon="lock"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :loading="loading"
                  block
                  color="primary"
                  @click="register"
                >
                  Register
                </v-btn>
              </v-card-actions>
              <span>
                Already have an account ? Login
                <a href="/#/login"> here.</a>
              </span>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { register } from '@/service/auth'

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: '',
      email: '',
    },
  }),

  methods: {
    register() {
      this.loading = true
      const { username, password, email } = this.model
      register({ username, password, email })
        .then((data) => {
          localStorage.setItem('jwt', data.jwt)
          localStorage.setItem('user', JSON.stringify(data.user))
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.loading = false
          localStorage.removeItem('jwt')
          localStorage.removeItem('user')
          console.log(error)
          window.$app.$emit('NOTIFY_ERROR', 'Username or password invalid.')
        })
    },
  },
}
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
