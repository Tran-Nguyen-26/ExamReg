import { AuthResponse } from '../pages/models/AuthResponse'
import apiCall from '../utils/api'

export const authService = {
  login : async (email, password) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    const authResponse = AuthResponse.fromJSON(response)
    localStorage.setItem('token', authResponse.token)
    localStorage.setItem('user', JSON.stringify(authResponse.user))
    return authResponse
  },

  changePasswordFirstTime : async (password) => {
    const response = await apiCall('/auth/change-password-first-time', {
      method: 'POST',
      body: JSON.stringify({password})
    })
    return response
  }
}