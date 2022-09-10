import React from 'react'
import ProjectTask from './ProjectTask'

function Backlog(props) {
  const project_tasks = props.project_tasks

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card text-center mb-2'>
            <div className='card-header bg-secondary text-white'>
              <h3>TO DO</h3>
            </div>
          </div>
          {project_tasks
            .filter((project_task) => project_task.status === 'TO_DO')
            .map((filtered_project_task) => (
              <ProjectTask
                key={filtered_project_task.id}
                project_task={filtered_project_task}
              />
            ))}
        </div>
        <div className='col-md-4'>
          <div className='card text-center mb-2'>
            <div className='card-header bg-primary text-white'>
              <h3>In Progress</h3>
            </div>
            {project_tasks
              .filter((project_task) => project_task.status === 'IN_PROGRESS')
              .map((filtered_project_task) => (
                <ProjectTask
                  key={filtered_project_task.id}
                  project_task={filtered_project_task}
                />
              ))}
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card text-center mb-2'>
            <div className='card-header bg-success text-white'>
              <h3>Done</h3>
            </div>
            {project_tasks
              .filter((project_task) => project_task.status === 'DONE')
              .map((filtered_project_task) => (
                <ProjectTask
                  key={filtered_project_task.id}
                  project_task={filtered_project_task}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Backlog
