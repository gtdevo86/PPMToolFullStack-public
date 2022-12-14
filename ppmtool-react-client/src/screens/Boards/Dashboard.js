import React, { useEffect } from 'react'
import CreateProjectButton from '../../components/Project/CreateProjectButton'
import ProjectItem from '../../components/Project/ProjectItem'
import { useSelector, useDispatch } from 'react-redux'
import { getProjects } from '../../actions/projectActions'
import Loader from '../../helpers/Loader'
import Message from '../../components/Layout/Message'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const { projects } = useSelector((state) => state.project)
  const { loading } = useSelector((state) => state.loading)
  const errors = useSelector((state) => state.errors)
  const { user } = useSelector((state) => state.user)
  const { isAdmin } = user

  useEffect(() => {
    if (isAdmin) navigate('/admin/Users')
  }, [dispatch, isAdmin, navigate])

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  return (
    <div className='projects'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4 text-center'>Projects</h1>
            <br />

            <CreateProjectButton />
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
export default Dashboard
