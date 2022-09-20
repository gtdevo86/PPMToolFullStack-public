import {
  DELETE_USER,
  GET_USER,
  GET_USERS,
  USER_DETAILS_RESET,
} from '../actions/types'

const initalState = {
  users: [],
  user: {},
}

export default function adminReducer(state = initalState, action) {
  switch (action.type) {
    case USER_DETAILS_RESET:
      return {
        ...state,
        user: {},
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.username !== action.payload),
      }
    default:
      return state
  }
}
