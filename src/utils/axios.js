import axios from 'axios'
import { getDefaultAuth, setLogout } from '../context/AuthContext'

let Axios = axios.create({
  baseURL: 'https://my-journal-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

Axios.interceptors.request.use(defaultConfig => {
  let config
  const user = getDefaultAuth()

  if (user) {
    config = {
      ...defaultConfig,
      headers: {
        ...defaultConfig.headers,
        Authorization: `Bearer ${user.token}`
      }
    }
  } else {
    config = defaultConfig
  }

  return config
})

Axios.interceptors.response.use(
  response => {
    return response
  },
  ({ response }) => {
    if (response && response.status === 401) {
      return setLogout()
    }
    return Promise.reject(response)
  }
)
export default Axios
