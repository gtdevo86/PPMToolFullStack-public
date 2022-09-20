import axios from 'axios'
import {
  DELETE_USER,
  END_LOADING,
  GET_ERRORS,
  GET_PROJECTS,
  GET_USER,
  GET_USERS,
  START_LOADING,
} from './types'
import { config } from '../helpers/apiConfig'
const { API_URL } = config

export const deleteUser = (userName) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    await axios.delete(`${API_URL}/api/admin/users/${userName}`)
    dispatch({ type: END_LOADING })
    dispatch({
      type: DELETE_USER,
      payload: userName,
    })
  } catch (err) {
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    const res = await axios.get(`${API_URL}/api/admin/users`)
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_USERS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    const res = await axios.get(`${API_URL}/api/admin/users/${id}`)
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_USER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const updateUser = (user, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    await axios.patch(`${API_URL}/api/admin/users/${user.username}`, user)
    dispatch({ type: END_LOADING })
    navigate('/admin/users')
  } catch (err) {
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const getAllProjects = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    const res = await axios.get(`${API_URL}/api/admin/project`)
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}
export const getProjectsByUsername = (username) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    const res = await axios.get(`${API_URL}/api/admin/users/${username}/projects`)
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}
