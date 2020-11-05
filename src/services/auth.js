import Axios from 'utils/axios'

export const loginUser = user => Axios.post(`/auth/login`, user)
export const registerUser = user => Axios.post(`/auth/register`, user)
export const changePassword = data => Axios.post(`/auth/change-password`, data)
