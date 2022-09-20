import axios from 'axios'
import {
  DELETE_PROJECT_TASK,
  END_LOADING,
  GET_BACKLOG,
  GET_ERRORS,
  GET_PROJECT_TASK,
  START_LOADING,
} from './types'
import { config } from '../helpers/apiConfig'
const { API_URL } = config

export const addProjectTask =
  (backlog_id, project_task, navigate) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      await axios.get(`${API_URL}/api/status`)
      await axios.post(`${API_URL}/api/backlog/${backlog_id}`, project_task)
      navigate(`/projectBoard/${backlog_id}`)
      dispatch({ type: END_LOADING })
    } catch (err) {
      dispatch({ type: END_LOADING })
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    }
  }

export const getBacklog = (backlog_id, admin) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    await axios.get(`${API_URL}/api/status`)
    var admin_string = ''
    if (admin) admin_string = 'admin/'
    const res = await axios.get(
      `${API_URL}/api/${admin_string}backlog/${backlog_id}`
    )
    dispatch({ type: END_LOADING })
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    })
  } catch (err) {
    dispatch({ type: START_LOADING })
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const getProjectTask =
  (backlog_id, sequence_id, admin, navigate, redirect) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      var admin_string = ''
      if (admin) admin_string = 'admin/'
      await axios.get(`${API_URL}/api/status`)
      const res = await axios.get(
        `${API_URL}/api/${admin_string}backlog/${backlog_id}/${sequence_id}`
      )
      dispatch({ type: END_LOADING })
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
      })
    } catch (err) {
      dispatch({ type: END_LOADING })
      navigate(redirect)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    }
  }

export const deleteProjectTask =
  (backlog_id, sequence_id, admin) => async (dispatch) => {
    if (window.confirm('Are you sure you  want to delete this project task?')) {
      var admin_string = ''
      if (admin) admin_string = 'admin/'
      await axios.get(`${API_URL}/api/status`)
      await axios.delete(
        `${API_URL}/api/${admin_string}backlog/${backlog_id}/${sequence_id}`
      )
      dispatch({
        type: DELETE_PROJECT_TASK,
        payload: sequence_id,
      })
    }
  }

export const updateProjectTask =
  (backlog_id, sequence_id, project_task, admin, navigate, redirect) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING })
      var admin_string = ''
      if (admin) admin_string = 'admin/'
      await axios.get(`${API_URL}/api/status`)
      await axios.patch(
        `${API_URL}/api/${admin_string}backlog/${backlog_id}/${sequence_id}`,
        project_task
      )
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
