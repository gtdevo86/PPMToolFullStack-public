import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { getProjectTask, updateProjectTask } from '../../actions/backlogActions'
import { RESET_ERRORS } from '../../actions/types'

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

  useEffect(() => {
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  useEffect(() => {
    dispatch(getProjectTask(params.backlog_id, params.sequence_id, navigate))
  }, [dispatch, params.backlog_id, params.sequence_id, navigate])

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
        navigate
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
            <Link
              to={`/projectBoard/${params.backlog_id}`}
              className='btn btn-light'
            >
              Back to Project Board
            </Link>
            <h4 className='display-4 text-center'>Update Project Task</h4>
            <p className='lead text-center'>
              Project Id: {project_task.projectIdentifier} -- Project Task Id:{' '}
              {project_task.projectSequence}
            </p>
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

              <input type='submit' className='btn btn-primary btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProjectTask
