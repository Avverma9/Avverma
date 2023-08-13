import React from 'react'
import "./Emdaccount.css"
import { useLocation } from 'react-router-dom'

export const Emdaccount = () => {
  const location=useLocation()
  if(location.pathname !== "/editemd"){
    return null
  }
  return (
      <div className="emd_account_container">
          <h1>Emd Account</h1>
          <input type="text" value="abcd" />
          <h1>Credit Notes</h1>
          <textarea  cols="30" rows="5">abcd</textarea>
    </div>
  )
}
