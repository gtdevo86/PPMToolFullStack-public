import React from 'react'
import { Navigate } from 'react-router-dom'
const SecuredRoute = ({ user, securedRoute, adminRequired = false }) => {
  if (user.validToken) {
    if (adminRequired === true && user.user.isAdmin === false) {
      return <Navigate to='/dashboard' replace />
    }

    return securedRoute
  }

  return <Navigate to='/login' replace />
}
export default SecuredRoute
