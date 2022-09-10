import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'

function Header() {
  const { user, validToken } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-primary mb-4'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Personal Project Management Tool
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'
        >
          <span className='navbar-toggler-icon' />
        </button>
        {validToken && user.username ? (
          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/dashboard'>
                  Dashboard
                </Link>
              </li>
            </ul>

            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link className='nav-link ' to='/dashboard'>
                  <i className='fas fa-user-circle mr-1'> {user.fullName}</i>
                </Link>
              </li>
              <Link className='nav-link' to='/' onClick={logoutHandler}>
                Logout
              </Link>
            </ul>
          </div>
        ) : (
          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <Link className='nav-link ' to='register'>
                  Sign Up
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='login'>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
