import React from 'react';
import './RegisterBuyer.css';

function RegisterBuyer() {
  return (
    <div className='main-container'>
    <div className='page-heading'>
        <h1>RegisterBuyer</h1>
    </div>
    <div className='form-container'>
        <label htmlFor='buyer-name'>
            <p>Buyer Name</p>
            <input type='text' />
        </label>
        <label htmlFor='pin-code'>
            <p>Pin Code</p>
            <input type='text' />
        </label>
        <label htmlFor='mobile-no'>
            <p>Mobile Number</p>
            <input type='text' />
        </label>
        <label htmlFor='mail-id'>
            <p>Email</p>
            <input type='text' />
        </label>
        <label htmlFor='region'>
            <p>Region</p>
            <input type='text' />
        </label>
        <label htmlFor='acc-status'>
            <p>Account Status</p>
            
          <select name="account-status" id="account-status">
        
            <option value="Active">Active</option>
            <option value="Inactive">InActive</option>
            
          </select>
        
        </label>
        <label htmlFor='user-name'>
            <p>Username</p>
            <input type='text' />
        </label>
        <label htmlFor='password'>
            <p>Password</p>
            <input type='password' />
        </label>
        <label htmlFor='vehicle-limit'>
            <p>Vehicle Limit</p>
            <input type='text' />
        </label>
        <label htmlFor='buying-amount'>
            <p>Buying Amount</p>
            <input type='text' />
        </label>
        <label htmlFor='registration-date'>
            <p>Registration Date</p>
            <input type='text' />
        </label>
        <label htmlFor='expiry-date'>
            <p>Expiry Date</p>
            <input type='text' />
        </label>
        <div className='assign-buyer'>
            <p>Assign Buyer</p>
        </div>
        <div className='emd-balance'>
            <p>EMD Balance</p>
        </div>
        <label htmlFor='pan-id'>
            <p>Pan Id/No</p>
            <input type='text'/>
        </label>
        <label htmlFor='upload-kyc'>
            <p>Upload Kyc</p>
            <input type='file'/>
        </label>
        <label htmlFor='address'>
            <p>Address</p>
            <input type='text'/>
        </label>
        <label htmlFor='kyc-varification'>
            <p>KYC Varification</p>
            <div className='radio-btn'>
            
                <input type='radio' value="varify" name='varified' id='varify'/><label for="varify">Varified</label>
                <input type='radio' value="notvarified" name='varified' id='not-varified'/><label for="not-varified">Not Varified</label>

            </div>
        </label>
    </div>
    <div className='submit'>
        <button className='submit-btn'>Submit</button>
    </div>
      
    </div>
  )
}

export default RegisterBuyer
