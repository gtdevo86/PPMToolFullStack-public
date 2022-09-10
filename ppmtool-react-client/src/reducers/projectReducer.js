import {
  DELETE_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  PROJECT_DETAILS_RESET,
} from '../actions/types'

const initalState = {
  projects: [],
  project: {
    projectName: '',
    projectIdentifier: '',
    description: '',
    start_date: '',
    end_date: '',
  },
}

export default function projectReducer(state = initalState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      }
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      }
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.projectIdentifier !== action.payload
        ),
      }
    case PROJECT_DETAILS_RESET:
      return {
        ...state,
        project: {
          projectName: '',
          projectIdentifier: '',
          description: '',
          start_date: '',
          end_date: '',
        },
      }
    default:
      return state
  }
}
