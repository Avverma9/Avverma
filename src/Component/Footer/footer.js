import React from 'react'
import './footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-a'>
        <p>Deposite</p>
        <p className='foot-yello'>Coming Soon</p>
      </div>
      <div className='footer-b'>
        <p>Buying Limits</p>
        <p className='foot-yello'>50000</p>
      </div>
      <div className='footer-c'>
        <p>Available Limits</p>
        <p className='foot-yello'>500000</p>
      </div>
    </div>
  )
}

export default Footer
