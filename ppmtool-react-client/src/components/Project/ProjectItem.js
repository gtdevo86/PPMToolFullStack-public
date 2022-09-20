import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../actions/projectActions'

function ProjectItem(props) {
  const location = useLocation()
  const { user } = useSelector((state) => state.user)
  const { isAdmin } = user
  const dispatch = useDispatch()
  const { project } = props

  const onDeleteClick = (id) => {
    dispatch(deleteProject(id, isAdmin))
  }

  return (
    <div className='container'>
      <div className='card card-body bg-light mb-3'>
        <div className='row'>
          <div className='col-2'>
            <h6>Project Name:</h6>
            <h6>Project Id:</h6>
            <h6>Project Leader:</h6>
          </div>
          <div className='col-2'>
            <h6>{project.projectName}</h6>
            <h6>{project.projectIdentifier}</h6>
            <h6>{project.projectLeader}</h6>
          </div>
          <div className='col-4'>
            <h6>Project Description:</h6>
            <p>{project.description}</p>
          </div>
          <div className='col-md-4 d-none d-lg-block'>
            <ul className='list-group'>
              <Link
                to={`/projectBoard/${project.projectIdentifier}?redirect=${location.pathname}${location.search}`}
              >
                <li className='list-group-item board'>
                  <i className='fa fa-flag-checkered pr-1'> Project Board </i>
                </li>
              </Link>

              <Link
                to={`/updateProject/${project.projectIdentifier}?redirect=${location.pathname}${location.search}`}
              >
                <li className='list-group-item update'>
                  <i className='fa fa-edit pr-1'> Update Project Info</i>
                </li>
              </Link>

              <li
                className='list-group-item delete'
                onClick={() => onDeleteClick(project.projectIdentifier)}
              >
                <i className='fa fa-minus-circle pr-1'> Delete Project</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
