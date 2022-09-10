import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RESET_ERRORS } from '../../actions/types'
import { registerUser } from '../../actions/userActions'
import classNames from 'classnames'

function Register() {
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    const newUser = {
      username: username,
      fullName: fullName,
      password: password,
      confirmPassword: confirmPassword,
    }
    dispatch(registerUser(newUser, navigate))
  }

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your Account</p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.fullName,
                  })}
                  placeholder='Name'
                  name='name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                {errors.fullName && (
                  <div className='invalid-feedback'>{errors.fullName}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.username,
                  })}
                  placeholder='Email Address'
                  name='email'
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
              <div className='form-group'>
                <input
                  type='password'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.confirmPassword,
                  })}
                  placeholder='Confirm Password'
                  name='password2'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                  <div className='invalid-feedback'>{errors.confirmPassword}</div>
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

export default Register
