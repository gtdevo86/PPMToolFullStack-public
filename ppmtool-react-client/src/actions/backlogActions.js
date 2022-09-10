import axios from 'axios'
import {
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
  GET_ERRORS,
  GET_PROJECT_TASK,
} from './types'
import { config } from '../helpers/apiConfig'
const { API_URL } = config

export const addProjectTask =
  (backlog_id, project_task, navigate) => async (dispatch) => {
    try {
      await axios.post(`${API_URL}/api/backlog/${backlog_id}`, project_task)
      navigate(`/projectBoard/${backlog_id}`)
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    }
  }

export const getBacklog = (backlog_id) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/api/backlog/${backlog_id}`)
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  }
}

export const getProjectTask =
  (backlog_id, sequence_id, navigate) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/backlog/${backlog_id}/${sequence_id}`
      )
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
      })
    } catch (err) {
      navigate(`/projectBoard/${backlog_id}`)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    }
  }

export const deleteProjectTask = (backlog_id, sequence_id) => async (dispatch) => {
  if (window.confirm('Are you sure you  want to delete this project task?')) {
    await axios.delete(`${API_URL}/api/backlog/${backlog_id}/${sequence_id}`)
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: sequence_id,
    })
  }
}

export const updateProjectTask =
  (backlog_id, sequence_id, project_task, navigate) => async (dispatch) => {
    try {
      await axios.patch(
        `${API_URL}/api/backlog/${backlog_id}/${sequence_id}`,
        project_task
      )
      navigate(`/projectBoard/${backlog_id}`)
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    }
  }
