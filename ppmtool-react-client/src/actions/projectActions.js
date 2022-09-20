import axios from 'axios'
import {
  DELETE_PROJECT,
  END_LOADING,
  GET_ERRORS,
  GET_PROJECT,
  GET_PROJECTS,
  START_LOADING,
} from './types'
import { config } from '../helpers/apiConfig'
const { API_URL } = config

export const createProject =
  (project, admin, navigate, redirect) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      var admin_string = ''
      if (admin) admin_string = 'admin/'
      await axios.get(`${API_URL}/api/status`)
      await axios.post(`${API_URL}/api/${admin_string}project`, project)
      dispatch({ type: END_LOADING })
      navigate(redirect)
    } catch (err) {
      dispatch({ type: END_LOADING })
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    }
  }

export const getProjects = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    const res = await axios.get(`${API_URL}/api/project/all`)
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

export const getProject = (id, admin) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    var admin_string = ''
    if (admin) admin_string = 'admin/'
    await axios.get(`${API_URL}/api/status`)
    const res = await axios.get(`${API_URL}/api/${admin_string}project/${id}`)
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_PROJECT,
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

export const deleteProject = (id, admin) => async (dispatch) => {
  if (window.confirm('Are you sure you  want to delete this project?')) {
    var admin_string = ''
    if (admin) admin_string = 'admin/'
    await axios.get(`${API_URL}/api/status`)
    await axios.delete(`${API_URL}/api/${admin_string}project/${id}`)
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    })
  }
}
