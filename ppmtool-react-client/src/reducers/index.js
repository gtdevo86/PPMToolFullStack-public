import { combineReducers } from 'redux'
import backlogReducer from './backlogReducer'
import errorReducer from './errorReducer'
import projectReducer from './projectReducer'
import userReducer from './userReducer'

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  user: userReducer,
})
