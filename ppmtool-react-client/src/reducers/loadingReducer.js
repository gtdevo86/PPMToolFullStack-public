import { END_LOADING, RESET_LOADER, START_LOADING } from '../actions/types'

const initalState = {
  loading: false,
}

export default function loadingReducer(state = initalState, action) {
  switch (action.type) {
    case RESET_LOADER:
      return {
        ...state,
        loading: false,
      }
    case START_LOADING:
      return {
        ...state,
        loading: true,
      }
    case END_LOADING:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
