import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'

function Header() {
  const { user, validToken } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const toggleOpen = () => setDropdown(!dropdown)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
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

                {user.isAdmin && (
                  <li className='nav-item dropdown' onClick={toggleOpen}>
                    <div
                      className='nav-link dropdown-toggle'
                      id='navbarDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      Admin Menu
                    </div>
                    <div
                      className={`dropdown-menu ${dropdown ? 'show' : ''}`}
                      aria-labelledby='navbarDropdown'
                    >
                      <Link className='dropdown-item' to='/admin/Users'>
                        View Users
                      </Link>
                      <Link className='dropdown-item' to='/admin/Projects'>
                        View Projects
                      </Link>
                    </div>
                  </li>
                )}

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
    </header>
  )
}

export default Header
