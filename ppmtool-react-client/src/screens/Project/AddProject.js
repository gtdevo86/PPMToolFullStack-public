import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../../actions/projectActions'
import classNames from 'classnames'
import { RESET_ERRORS } from '../../actions/types'
import Message from '../../components/Layout/Message'

function AddProject() {
  const [projectName, setProjectName] = useState('')
  const [projectIdentifier, setProjectIdentifier] = useState('')
  const [description, setDescription] = useState('')
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] = useState('')
  const errors = useSelector((state) => state.errors)
  const { loading } = useSelector((state) => state.loading)
  let navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    const newProject = {
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      start_date: start_date,
      end_date: end_date,
    }
    dispatch(createProject(newProject, false, navigate, '/dashboard'))
  }

  return (
    <div>
      <div className='project'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h5 className='display-4 text-center'>Create Project form</h5>
              <hr />
              {errors.message && (
                <Message variant='danger'>{errors.message}</Message>
              )}
              {errors.projectIdentifer && (
                <Message variant='danger'>{errors.projectIdentifer}</Message>
              )}
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.projectName,
                    })}
                    placeholder='Project Name'
                    name='projectName'
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />

                  {errors.projectName && (
                    <div className='invalid-feedback'>{errors.projectName}</div>
                  )}
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.projectIdentifier,
                    })}
                    placeholder='Unique Project ID'
                    name='projectIdentifier'
                    value={projectIdentifier}
                    onChange={(e) => setProjectIdentifier(e.target.value)}
                  />
                  {errors.projectIdentifier && (
                    <div className='invalid-feedback'>
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>

                <div className='form-group'>
                  <textarea
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.description,
                    })}
                    placeholder='Project Description'
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {errors.description && (
                    <div className='invalid-feedback'>{errors.description}</div>
                  )}
                </div>

                <h6>Start Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='start_date'
                    value={start_date}
                    onChange={(e) => setStart_date(e.target.value)}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='end_date'
                    value={end_date}
                    onChange={(e) => setEnd_date(e.target.value)}
                  />
                </div>
                <button
                  disabled={loading}
                  className='btn btn-primary btn-block mt-4'
                >
                  {loading && (
                    <span className='spinner-border spinner-border-sm mr-1'></span>
                  )}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProject
