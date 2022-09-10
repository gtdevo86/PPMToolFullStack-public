import axios from 'axios'
import setJWTToken from '../helpers/setJWTToken'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import jwt_decode from 'jwt-decode'
import { config } from '../helpers/apiConfig'
const { API_URL } = config

export const registerUser = (newUser, navigate) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/users/register`, newUser)
    navigate('/login')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const login = (LoginRequest) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/login`, LoginRequest)
    const { token } = res.data
    localStorage.setItem('jwtToken', token)
    setJWTToken(token)
    const decodedToken = jwt_decode(token)
    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken,
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const logout = (dispatch) => {
  localStorage.removeItem('jwtToken')
  setJWTToken(false)
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  })
}
