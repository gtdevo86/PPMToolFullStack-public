import React, { useEffect } from 'react'
import ProjectItem from '../../components/Project/ProjectItem'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../helpers/Loader'
import Message from '../../components/Layout/Message'
import queryString from 'query-string'
import { Link, useLocation } from 'react-router-dom'
import { getAllProjects, getProjectsByUsername } from '../../actions/adminActions'

function ViewProjects() {
  const dispatch = useDispatch()
  const { projects } = useSelector((state) => state.project)
  const { loading } = useSelector((state) => state.loading)
  const errors = useSelector((state) => state.errors)
  const location = useLocation()
  const parsedQuery = queryString.parse(location.search)

  const username = parsedQuery.username || null

  useEffect(() => {
    if (username == null) dispatch(getAllProjects())
    else dispatch(getProjectsByUsername(username))
  }, [dispatch, username])

  return (
    <div className='projects'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Link to='/admin/Users'>
              {username && (
                <button
                  disabled={loading}
                  className='btn btn-danger btn-block mt-4'
                >
                  Back
                </button>
              )}
            </Link>
            <h1 className='display-4 text-center'>Projects</h1>
            <br />
            <br />
            <hr />
            {loading ? (
              <Loader></Loader>
            ) : errors.message ? (
              <Message variant='danger'>{errors.message}</Message>
            ) : (
              projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ViewProjects
