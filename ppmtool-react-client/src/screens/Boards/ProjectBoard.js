import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Backlog from '../../components/Backlog/Backlog'
import { useSelector, useDispatch } from 'react-redux'
import { getBacklog } from '../../actions/backlogActions'
import { RESET_ERRORS } from '../../actions/types'
import { getProject } from '../../actions/projectActions'

function ProjectBoard() {
  const params = useParams()
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const errors = useSelector((state) => state.errors)
  const { project_tasks } = useSelector((state) => state.backlog)
  const { project } = useSelector((state) => state.project)

  useEffect(() => {
    dispatch(getBacklog(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  useEffect(() => {
    dispatch(getProject(params.id, navigate))
  }, [dispatch, params.id, navigate])

  return (
    <div className='container'>
      {errors.projectNotFound ? (
        <div className='alert alert-danger text-center' role='alert'>
          {errors.projectNotFound}
        </div>
      ) : (
        <>
          <Link
            to={`/addProjectTask/${params.id}`}
            className='btn btn-primary mb-3'
          >
            <i className='fas fa-plus-circle'> Create Project Task</i>
          </Link>
          <br />
          <p className='lead text-center'>
            {project.projectName} -- {project.projectIdentifier}
          </p>
          <hr />
          {project_tasks.length < 1 ? (
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
