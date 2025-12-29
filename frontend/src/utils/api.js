const API_URL = 'http://localhost:8080/api/v1'

const apiCall = async (endpoint, options = {}, useAuth = true) => {
  const token = localStorage.getItem('token')
  let config  = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(useAuth && token ? {Authorization: `Bearer ${token}`} : {}),
      ...options.headers
    }
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config)

    const data = await response.json()

    if (!response.ok && response.status !== 401) {
      throw {...data, status: response.status}
    }


    if (response.status === 401 && useAuth) {
      const refreshToken = localStorage.getItem('refreshToken')
      const user = JSON.parse(localStorage.getItem('user') || '{}')

      if (!refreshToken || user.role !== 'ADMIN') {
        logout()
        window.alert("Phiên đăng nhập đã hết hạn")
        throw new Error('Phiên đăng nhập đã hết hạn')
      }

      const newTokens = await refreshAccessToken(refreshToken)
      console.log(newTokens)
      config = { 
        ...config, 
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newTokens.token}`
        } 
      }
      const retryResponse = await fetch(`${API_URL}${endpoint}`, config)
      const retryData = await retryResponse.json()

      if (!retryResponse.ok) {
        throw {...retryData, status: retryResponse.status}
      }

      return retryData
    }

    return data
  } catch (e) {
    throw e
  }
}

const refreshAccessToken = async (refreshToken) => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({refreshToken})
  })

  if (!response.ok) {
    throw new Error('Hết phiên đăng nhập')
  }

  const result = await response.json()
  localStorage.setItem('token', result.data.token)
  localStorage.setItem('refreshToken', result.data.refreshToken)
  return result.data.token
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
  window.location.href = '/login'
}

export default apiCall
