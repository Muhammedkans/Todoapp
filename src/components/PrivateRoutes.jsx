import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

  const {token} = useSelector((state)=>state.auth);

  return (
    <div>
{
  token? children : <Navigate to="/login"/>
}

    </div>
  )
}

export default PrivateRoutes