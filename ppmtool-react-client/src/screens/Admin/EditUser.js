import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RESET_ERRORS, USER_DETAILS_RESET } from '../../actions/types'
import classNames from 'classnames'
import Message from '../../components/Layout/Message'
import { getUser, updateUser } from '../../actions/adminActions'

function EditUser() {
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const errors = useSelector((state) => state.errors)
  const { user } = useSelector((state) => state.admin)
  const { loading } = useSelector((state) => state.loading)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  if (errors.projectNotFound) navigate('/dashboard')
  useEffect(() => {
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: RESET_ERRORS })
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setFullName(user.fullName)
      setIsAdmin(user.isAdmin)
    }
  }, [user])

  const onSubmit = (e) => {
    e.preventDefault()
    const editedUser = {
      id: user.id,
      username: username,
      fullName: fullName,
      isAdmin: isAdmin,
    }
    dispatch(updateUser(editedUser, navigate))
  }

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit User</h1>
            {loading && (
              <Message variant='info'>
                Please wait for the instance to boot up
              </Message>
            )}
            {errors.message && <h3 className='text-center'>{errors.message}</h3>}
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.username,
                  })}
                  placeholder='Username'
                  name='email'
                  value={username}
                  disabled
                />
                {errors.username && (
                  <div className='invalid-feedback'>{errors.username}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': errors.fullName,
                  })}
                  placeholder='Full Name'
                  name='name'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                {errors.fullName && (
                  <div className='invalid-feedback'>{errors.fullName}</div>
                )}
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                  id='flexCheckDefault'
                />
                <label className='form-check-label'>Is Admin</label>
              </div>
              <button
                disabled={loading}
                className='btn btn-info btn-block mt-4 me-4 '
              >
                {loading && (
                  <span className='spinner-border spinner-border-sm mr-1'></span>
                )}
                Submit
              </button>
              <Link to='/admin/Users'>
                <button
                  disabled={loading}
                  className='btn btn-danger btn-block mt-4 ml-4'
                >
                  Cancel
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
