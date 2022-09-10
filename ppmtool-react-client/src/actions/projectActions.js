import axios from 'axios'
import { DELETE_PROJECT, GET_ERRORS, GET_PROJECT, GET_PROJECTS } from './types'
import { config } from '../helpers/apiConfig'
const { API_URL } = config

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}/api/project`, project)
    navigate('/dashboard')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/api/project/all`)
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const getProject = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/api/project/${id}`)
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    })
  } catch (err) {
    //navigate('/dashboard')
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const deleteProject = (id) => async (dispatch) => {
  if (window.confirm('Are you sure you  want to delete this project?')) {
    await axios.delete(`${API_URL}/api/project/${id}`)
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    })
  }
}
