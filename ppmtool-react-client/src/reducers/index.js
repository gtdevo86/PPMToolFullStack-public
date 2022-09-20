import { combineReducers } from 'redux'
import adminReducer from './adminReducer'
import backlogReducer from './backlogReducer'
import errorReducer from './errorReducer'
import loadingReducer from './loadingReducer'
import projectReducer from './projectReducer'
import userReducer from './userReducer'

export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  user: userReducer,
  loading: loadingReducer,
  admin: adminReducer,
})
