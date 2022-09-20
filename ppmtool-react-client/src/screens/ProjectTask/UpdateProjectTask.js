import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { getProjectTask, updateProjectTask } from '../../actions/backlogActions'
import { RESET_ERRORS } from '../../actions/types'
import Loader from '../../helpers/Loader'
import Message from '../../components/Layout/Message'
import queryString from 'query-string'

function UpdateProjectTask() {
  const params = useParams()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const errors = useSelector((state) => state.errors)
  const [summary, setSummary] = useState('')
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('')
  const [status, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState(0)
  const { project_task } = useSelector((state) => state.backlog)
  const { loading } = useSelector((state) => state.loading)
  const { user } = useSelector((state) => state.user)
  const { isAdmin } = user
  const location = useLocation()
  const parsedQuery = queryString.parse(location.search)
  const redirect = parsedQuery.redirect || '/'

  useEffect(() => {
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  useEffect(() => {
    dispatch(
      getProjectTask(
        params.backlog_id,
        params.sequence_id,
        isAdmin,
        navigate,
        redirect
      )
    )
  }, [dispatch, params.backlog_id, params.sequence_id, isAdmin, navigate, redirect])

  const onSubmit = (e) => {
    e.preventDefault()
    const updatedProjectTask = {
      id: project_task.id,
      summary: summary,
      acceptanceCriteria: acceptanceCriteria,
      status: status,
      dueDate: dueDate,
      priority: priority,
      projectIdentifier: project_task.projectIdentifier,
      projectSequence: project_task.projectSequence,
    }

    dispatch(
      updateProjectTask(
        params.backlog_id,
        params.sequence_id,
        updatedProjectTask,
        isAdmin,
        navigate,
        redirect
      )
    )
  }

  useEffect(() => {
    if (project_task) {
      setSummary(project_task.summary)
      setAcceptanceCriteria(project_task.acceptanceCriteria)
      setDueDate(project_task.dueDate)
      setPriority(project_task.priority)
      setStatus(project_task.status)
    }
  }, [project_task])

  return (
    <div className='add-PBI'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h4 className='display-4 text-center'>Update Project Task</h4>
            <p className='lead text-center'>
              Project Id: {project_task.projectIdentifier} -- Project Task Id:{' '}
              {project_task.projectSequence}
            </p>
            {errors.message && <Message variant='danger'>{errors.message}</Message>}
            {loading ? (
              <Loader></Loader>
            ) : (
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.summary,
                    })}
                    name='summary'
                    placeholder='Project Task summary'
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                  {errors.summary && (
                    <div className='invalid-feedback'>{errors.summary}</div>
                  )}
                </div>
                <div className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    placeholder='Acceptance Criteria'
                    name='acceptanceCriteria'
                    value={acceptanceCriteria}
                    onChange={(e) => setAcceptanceCriteria(e.target.value)}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='dueDate'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    name='priority'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    name='status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value=''>Select Status</option>
                    <option value='TO_DO'>TO DO</option>
                    <option value='IN_PROGRESS'>IN PROGRESS</option>
                    <option value='DONE'>DONE</option>
                  </select>
                </div>

                <button
                  disabled={loading}
                  className='btn btn-primary btn-block mt-4 me-4'
                >
                  {loading && (
                    <span className='spinner-border spinner-border-sm mr-1'></span>
                  )}
                  Submit
                </button>
                <Link to={redirect}>
                  <button
                    disabled={loading}
                    className='btn btn-danger btn-block mt-4'
                  >
                    Cancel
                  </button>
                </Link>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProjectTask
