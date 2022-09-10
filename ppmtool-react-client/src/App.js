import './App.css'
import Header from './components/Layout/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { store } from './store'
import Dashboard from './screens/Boards/Dashboard'
import AddProject from './screens/Project/AddProject'
import UpdateProject from './screens/Project/UpdateProject'
import ProjectBoard from './screens/Boards/ProjectBoard'
import AddProjectTask from './screens/ProjectTask/AddProjectTask'
import UpdateProjectTask from './screens/ProjectTask/UpdateProjectTask'
import Landing from './screens/User/Landing'
import Login from './screens/User/Login'
import Register from './screens/User/Register'
import jwt_decode from 'jwt-decode'
import setJWTToken from './helpers/setJWTToken'
import { SET_CURRENT_USER } from './actions/types'
import { logout } from './actions/userActions'
import SecureRoute from './helpers/SecureRoute'
const jwtToken = localStorage.jwtToken

if (jwtToken) {
  setJWTToken(jwtToken)
  const decodedToken = jwt_decode(jwtToken)
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken,
  })

  const currentTime = Date.now() / 1000
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout)
    window.location.href = '/'
  }
}

function App() {
  const user = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      <Header />
      <div className='App'>
        <Routes>
          {/*public*/}
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />

          {/*private*/}

          <Route
            exact
            path='/dashboard'
            element={<SecureRoute user={user} securedRoute={<Dashboard />} />}
          />
          <Route
            exact
            path='/addProject'
            element={<SecureRoute user={user} securedRoute={<AddProject />} />}
          />
          <Route
            exact
            path='/updateProject/:id'
            element={<SecureRoute user={user} securedRoute={<UpdateProject />} />}
          />
          <Route
            exact
            path='/projectBoard/:id'
            element={<SecureRoute user={user} securedRoute={<ProjectBoard />} />}
          />
          <Route
            exact
            path='/addProjectTask/:id'
            element={<SecureRoute user={user} securedRoute={<AddProjectTask />} />}
          />
          <Route
            exact
            path='/updateProjectTask/:backlog_id/:sequence_id'
            element={
              <SecureRoute user={user} securedRoute={<UpdateProjectTask />} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
