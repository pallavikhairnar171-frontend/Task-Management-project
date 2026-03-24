import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate ,Outlet } from 'react-router-dom'

export const Authentication = ({children}) => {

    const {token} = useSelector(state => state.auth) || localStorage.getItem('token');
    console.log(token,"----------",children);
    
  return token ? <Outlet /> : <Navigate to="/login" /> || <Navigate to="/registration" />
}
