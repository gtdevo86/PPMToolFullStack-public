import React from 'react'
import { Navigate } from 'react-router-dom'
const SecuredRoute = ({ user, securedRoute }) => {
  if (user.validToken) return securedRoute
  return <Navigate to='/login' replace />
}

export default SecuredRoute
