import axios from 'axios'
import { API_BASE_URL } from '@/constants'

export function register({ username, email, password }) {
  return axios
    .post(`${API_BASE_URL}/auth/local/register`, {
      username,
      email,
      password,
    })
    .then((response) => {
      return response.data
    })
}

export function login({ username, password }) {
  return axios
    .post(`${API_BASE_URL}/auth/local`, {
      identifier: username,
      password,
    })
    .then((response) => {
      return response.data
    })
}
