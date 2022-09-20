import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, getUsers } from '../../actions/adminActions'
import Message from '../../components/Layout/Message'
import Loader from '../../helpers/Loader'

function AdminUserBoard() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.loading)
  const errors = useSelector((state) => state.errors)
  const { users } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const deleteHandler = (username) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(username))
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 table-responsive'>
          {loading ? (
            <Loader></Loader>
          ) : errors.message ? (
            <Message variant='danger'>{errors.message}</Message>
          ) : (
            <>
              <h1>Users</h1>
              <table className='table table-sm table-striped table-bordered table-hover'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>ADMIN</th>
                    <th style={{ width: '150px', textAlign: 'center' }}>
                      VIEW PROJECTS
                    </th>
                    <th style={{ width: '100px', textAlign: 'center' }}>
                      EDIT USER
                    </th>
                    <th style={{ width: '70px', textAlign: 'center' }}>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>

                      <td>
                        <a href={`mailto:${user.username}`}>{user.username}</a>
                      </td>

                      <td>{user.fullName}</td>

                      <td style={{ textAlign: 'center' }}>
                        {user.isAdmin ? (
                          <i
                            className='fas fa-check mr-1'
                            style={{ color: 'green' }}
                          />
                        ) : (
                          <i
                            className='fas fa-times mr-1'
                            style={{ color: 'red' }}
                          />
                        )}
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <Link to={`/admin/Projects?username=${user.username}`}>
                          <button className='btn btn-sm btn-success'>
                            <i className='fas fa-th-list'></i>
                          </button>
                        </Link>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <Link to={`/admin/User/${user.id}`}>
                          <button className='btn btn-sm btn-primary'>
                            <i className='fas fa-edit mr-1' />
                          </button>
                        </Link>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => deleteHandler(user.username)}
                        >
                          <i className='fas fa-trash mr-1' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminUserBoard
