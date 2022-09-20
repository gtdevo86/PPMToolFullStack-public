import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RESET_ERRORS } from '../../actions/types'
import { login } from '../../actions/userActions'
import classNames from 'classnames'
import Message from '../../components/Layout/Message'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errors = useSelector((state) => state.errors)
  const user = useSelector((state) => state.user)
  const { loading } = useSelector((state) => state.loading)
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
            {loading && (
              <Message variant='info'>
                Please wait for the instance to boot up
              </Message>
            )}
            {errors.message && <h3 className='text-center'>{errors.message}</h3>}
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
              <button disabled={loading} className='btn btn-info btn-block mt-4'>
                {loading && (
                  <span className='spinner-border spinner-border-sm mr-1'></span>
                )}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
