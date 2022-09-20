import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Backlog from '../../components/Backlog/Backlog'
import { useSelector, useDispatch } from 'react-redux'
import { getBacklog } from '../../actions/backlogActions'
import { RESET_ERRORS } from '../../actions/types'
import { getProject } from '../../actions/projectActions'
import Loader from '../../helpers/Loader'
import Message from '../../components/Layout/Message'
import queryString from 'query-string'

function ProjectBoard() {
  const params = useParams()
  const dispatch = useDispatch()
  const errors = useSelector((state) => state.errors)
  const { project_tasks } = useSelector((state) => state.backlog)
  const { project } = useSelector((state) => state.project)
  const { loading } = useSelector((state) => state.loading)
  const { user } = useSelector((state) => state.user)
  const { isAdmin } = user
  const location = useLocation()
  const parsedQuery = queryString.parse(location.search)
  console.log(parsedQuery)
  const redirect = parsedQuery.redirect || '/'

  useEffect(() => {
    dispatch(getBacklog(params.id, isAdmin))
  }, [dispatch, params.id, isAdmin])

  useEffect(() => {
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  useEffect(() => {
    dispatch(getProject(params.id, isAdmin))
  }, [dispatch, params.id, isAdmin])

  return (
    <div className='container'>
      {errors.projectNotFound ? (
        <Message variant='danger'>{errors.projectNotFound}</Message>
      ) : errors.message ? (
        <Message variant='danger'>{errors.message}</Message>
      ) : (
        <>
          <Link to={redirect}>
            <button
              disabled={loading}
              className='btn btn-danger btn-block mb-3 me-3'
            >
              Back
            </button>
          </Link>
          <br />
          {!isAdmin && (
            <Link
              to={`/addProjectTask/${params.id}`}
              className='btn btn-primary mb-3'
            >
              <i className='fas fa-plus-circle'> Create Project Task</i>
            </Link>
          )}

          <br />
          <p className='lead text-center'>
            {loading
              ? 'loading...'
              : project.projectName + '--' + project.projectIdentifier}
          </p>
          <hr />
          {loading ? (
            <Loader></Loader>
          ) : project_tasks.length < 1 ? (
            <div className='alert alert-info text-center' role='alert'>
              No Project Task on this board
            </div>
          ) : (
            <Backlog project_tasks={project_tasks} />
          )}
        </>
      )}
    </div>
  )
}

export default ProjectBoard
