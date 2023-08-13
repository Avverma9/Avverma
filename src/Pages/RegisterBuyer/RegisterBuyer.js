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
            <input type='text' placeholder='zishan' />
        </label>
        <label htmlFor='pin-code'>
            <p>Pin Code</p>
            <input type='text' placeholder='322001'/>
        </label>
        <label htmlFor='mobile-no'>
            <p>Mobile Number</p>
            <input type='text' placeholder='6375360267'/>
        </label>
        <label htmlFor='mail-id'>
            <p>Email</p>
            <input type='email' placeholder='email'/>
        </label>
        <label htmlFor='region'>
            <p>Region</p>
            <select name="region" id="region">
        
            <option value="jaipur">Jaipur</option>
            <option value="kota">Kota</option>
            
          </select>
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
            <input type='text' placeholder='@mohammad'/>
        </label>
        <label htmlFor='password'>
            <p>Password</p>
            <input type='password' placeholder='1234554321'/>
        </label>
        <label htmlFor='vehicle-limit'>
            <p>Vehicle Limit</p>
            <input type='text' placeholder='10'/>
        </label>
        <label htmlFor='buying-amount'>
            <p>Buying Amount</p>
            <input type='text' placeholder='100000'/>
        </label>
        <label htmlFor='registration-date'>
            <p>Registration Date</p>
            <input type='text' placeholder='25/10/2023'/>
        </label>
        <label htmlFor='expiry-date'>
            <p>Expiry Date</p>
            <input type='text' placeholder='24/10/2023'/>
        </label>
        <div className='assign-buyer'>
            <p>Assign Buyer</p>
        </div>
        <div className='emd-balance'>
            <p>EMD Balance</p>
        </div>
        <label htmlFor='pan-id'>
            <p>Pan Id/No</p>
            <input type='text' placeholder='45454545454545'/>
        </label>
        <label htmlFor='upload-kyc'>
            <p>Upload Kyc</p>
            <input type='file'/>
        </label>
        <label htmlFor='address'>
            <p>Address</p>
            <input type='text'/>
        </label>
        <div className='kyc-varify'>
            <p>KYC Varification</p>
            <div className='radio-btn'>
            <div className='radio-1'>
                <input type='radio' value="varify" name='varified' id='varify'/><label for="varify">Varified</label></div>
                <div className='radio-2'>
                <input type='radio' value="notvarified" name='varified' id='not-varified'/><label for="not-varified">Not Varified</label></div>

            </div>
            </div>
    </div>
    <div className='submit'>
        <button className='submit-btn'>Submit</button>
    </div>
      
    </div>
  )
}

export default RegisterBuyer
