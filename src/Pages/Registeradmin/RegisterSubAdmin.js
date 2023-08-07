import React from 'react';
import './RegisterSubAdmin.css';

function RegisterSubAdmin() {
  return (
    <div className='main-container'>
    <div className='page-heading'>
        <h1>Register Sub Admin</h1>
    </div>
    <div className='form-container'>
        <label htmlFor='sub-admin-name'>
            <p>Sub Admin Name</p>
            <input type='text' />
        </label>
        <label htmlFor='mobile-no'>
            <p>Mobile Number</p>
            <input type='text' />
        </label>
        <label htmlFor='mail-id'>
            <p>Mail id/Username</p>
            <input type='text' />
        </label>
        <label htmlFor='password'>
            <p>Password</p>
            <input type='password' />
        </label>
        <label htmlFor='assign-region'>
            <p>Assign Region</p>
            
          <select name="region" id="account-region">
        
            <option value="Jaipur">Jaipur</option>
            <option value="kota">Kota</option>
            <option value="ajmer">Ajmer</option>
            <option value="udaipur">Udaipur</option>
            <option value="sawaimadhopur">Sawai madhopur</option>
            
          </select>
        
        </label>
        <label htmlFor='acc-status'>
            <p>Account Status</p>
            
          <select name="status" id="account-status">
        
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            
            
          </select>
        
        </label>
        <label htmlFor='acc-role'>
            <p>Account Role</p>
            
          <select name="role" id="account-role">
        
            <option value="admin">Admin</option>
            <option value="subadmin">Subadmin</option>
            
            
          </select>
        
        </label>
        
        
        </div>
        <div className='submit'>
        <button className='submit-btn'>Submit</button>
    </div>
        </div>
  )
}

export default RegisterSubAdmin
