import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

/*
const initalState = {}
const middleware = [thunk]

let store

if (window.navigator.userAgent.includes('Chrome')) {
  store = createStore(
    rootReducer,
    initalState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
} else {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  )
}*/

const store = configureStore({ reducer: rootReducer })
export { store }
