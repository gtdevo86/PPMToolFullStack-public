import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RESET_ERRORS } from '../../actions/types'
import { login } from '../../actions/userActions'
import classNames from 'classnames'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errors = useSelector((state) => state.errors)
  const user = useSelector((state) => state.user)
  let navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  useEffect(() => {
    if (user.validToken) navigate('/dashboard')
  }, [dispatch, user.validToken, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    const LoginRequest = {
      username: username,
      password: password,
    }
    dispatch(login(LoginRequest))
  }
  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.username,
                  })}
                  placeholder='Email Address'
                  name='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <div className='invalid-feedback'>{errors.username}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
                )}
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
