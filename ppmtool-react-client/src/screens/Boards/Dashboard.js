import React, { useEffect } from 'react'
import CreateProjectButton from '../../components/Project/CreateProjectButton'
import ProjectItem from '../../components/Project/ProjectItem'
import { useSelector, useDispatch } from 'react-redux'
import { getProjects } from '../../actions/projectActions'

function Dashboard() {
  const dispatch = useDispatch()
  const { projects } = useSelector((state) => state.project)

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
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard
