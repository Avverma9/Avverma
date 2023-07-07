import React from 'react';
import './Importauction.css';


function Importauction() {
  return (
    <div className='import-auction'>
      <div className='import-auction-heading'>
        <div className='import-icon'>
          <span>Import Auction</span></div>
        
      </div>
      <div className='import-inputs'>
        <input type='text' placeholder='Selected Category v'/>
        <input type='text' placeholder='Selected Region v'/>
        <input type='text' placeholder='Selected Seller v'/>

      </div>
      <div className='import-buttons'>
        <input type='button' value='Upload Csv'/>
        <input type='button' value='Upload Xlx'/>
      </div>

    </div>
  )
}

export default Importauction
