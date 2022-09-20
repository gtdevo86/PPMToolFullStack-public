import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { deleteProjectTask } from '../../actions/backlogActions'

function ProjectTask(props) {
  const { user } = useSelector((state) => state.user)
  const location = useLocation()
  const { isAdmin } = user
  const { project_task } = props
  let priorityString = 'LOW'
  let priorityClass = 'bg-info text-light'
  const dispatch = useDispatch()

  if (project_task.priority === 2) {
    priorityString = 'MEDIUM'
    priorityClass = 'bg-warning text-light'
  } else if (project_task.priority === 1) {
    priorityString = 'HIGH'
    priorityClass = 'bg-danger text-light'
  }

  const onDeleteClick = (backlog_id, pt_id) => {
    dispatch(deleteProjectTask(backlog_id, pt_id, isAdmin))
  }

  return (
    <div className='card mb-1 bg-light'>
      <div className={`card-header text-primary' ${priorityClass}`}>
        ID: {project_task.projectIdentifier} -- Priority: {priorityString}
      </div>
      <div className='card-body bg-light'>
        <h5 className='card-title'>{project_task.summary}</h5>
        <p className='card-text text-truncate '>
          {project_task.acceptanceCriteria}
        </p>
        <Link
          to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}?redirect=${location.pathname}${location.search}`}
          className='btn btn-primary me-4'
        >
          View / Update
        </Link>
        <button
          className='btn btn-danger ml-4'
          onClick={() =>
            onDeleteClick(
              project_task.projectIdentifier,
              project_task.projectSequence
            )
          }
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProjectTask
