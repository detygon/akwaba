<template>
  <v-app class="primary">
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
                <v-btn :loading="loading" block color="primary" @click="login">
                  Login
                </v-btn>
              </v-card-actions>
              <span>
                Want to create an account ? It's
                <a href="/#/register"> here.</a>
              </span>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { login } from '@/service/auth'

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: '',
    },
  }),

  methods: {
    login() {
      this.loading = true
      const { username, password } = this.model
      login({ username, password })
        .then((data) => {
          localStorage.setItem('jwt', data.jwt)
          localStorage.setItem('user', JSON.stringify(data.user))
          this.$router.push('/dashboard')
        })
        .catch(() => {
          this.loading = false
          localStorage.removeItem('jwt')
          localStorage.removeItem('user')
          window.$app.$emit('NOTIFY_ERROR', 'Username or password invalid.')
        })
    },
  },
}
</script>
