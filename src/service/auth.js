import axios from 'axios'
import { API_BASE_URL } from '@/constants'

export function register({ username, email, password }) {
  axios
    .post(`${API_BASE_URL}/auth/local/register`, {
      username,
      email,
      password,
    })
    .then((response) => {
      // Handle success.
      console.log('Well done!')
      console.log('User profile', response.data.user)
      console.log('User token', response.data.jwt)
    })
    .catch((error) => {
      // Handle error.
      console.log('An error occurred:', error)
    })
}

export function login({ username, password }) {
  axios
    .post(`${API_BASE_URL}/auth/local`, {
      identifier: username,
      password,
    })
    .then((response) => {
      // Handle success.
      console.log('Well done!')
      console.log('User profile', response.data.user)
      console.log('User token', response.data.jwt)
    })
    .catch((error) => {
      // Handle error.
      console.log('An error occurred:', error)
    })
}
