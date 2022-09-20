import React, { useEffect, useState } from 'react'
import { getProject, createProject } from '../../actions/projectActions'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { PROJECT_DETAILS_RESET, RESET_ERRORS } from '../../actions/types'
import Loader from '../../helpers/Loader'
import Message from '../../components/Layout/Message'
import queryString from 'query-string'

function UpdateProject(props) {
  const [projectName, setProjectName] = useState('')
  const [projectIdentifier, setProjectIdentifier] = useState('')
  const [description, setDescription] = useState('')
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] = useState('')
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const params = useParams()
  const { project } = useSelector((state) => state.project)
  const errors = useSelector((state) => state.errors)
  const { loading } = useSelector((state) => state.loading)
  const { user } = useSelector((state) => state.user)
  const { isAdmin } = user
  const location = useLocation()
  const parsedQuery = queryString.parse(location.search)
  const redirect = parsedQuery.redirect || '/'

  if (errors.projectNotFound) navigate('/dashboard')
  useEffect(() => {
    dispatch({ type: PROJECT_DETAILS_RESET })
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  useEffect(() => {
    dispatch(getProject(params.id, isAdmin))
  }, [dispatch, params.id, isAdmin])

  useEffect(() => {
    if (project) {
      setProjectName(project.projectName)
      setProjectIdentifier(project.projectIdentifier)
      setDescription(project.description)
      setStart_date(project.start_date)
      setEnd_date(project.end_date)
    }
  }, [project])

  const onSubmit = (e) => {
    e.preventDefault()
    const updateProject = {
      id: project.id,
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      start_date: start_date,
      end_date: end_date,
    }
    dispatch(createProject(updateProject, isAdmin, navigate, redirect))
  }

  return (
    <div className='project'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h5 className='display-4 text-center'>Edit Project form</h5>
            {errors.message && <Message variant='danger'>{errors.message}</Message>}
            <hr />
            {loading ? (
              <Loader></Loader>
            ) : (
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    name='projectName'
                    type='text'
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.projectName,
                    })}
                    placeholder='Project Name'
                    value={projectName || ''}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  {errors.projectName && (
                    <div className='invalid-feedback'>{errors.projectName}</div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    name='projectIdentifier'
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Unique Project ID'
                    disabled
                    value={projectIdentifier}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    name='description'
                    className={classNames('form-control form-control-lg', {
                      'is-invalid': errors.description,
                    })}
                    placeholder='Project Description'
                    value={description || ''}
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
                    value={start_date || ''}
                    onChange={(e) => setStart_date(e.target.value)}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className='form-group'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    name='end_date'
                    value={end_date || ''}
                    onChange={(e) => setEnd_date(e.target.value)}
                  />
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

export default UpdateProject
