import React from 'react';
import './Upload.css';
import {GrUpload} from 'react-icons/gr';

function Upload() {
  return (
    <div className='upload-statement'>
    <div className='text-c'>
        <p>Upload Statement</p>
    </div>
    <div className='file-upload-a'>
    <label for="upload-btnr"><GrUpload/>Upload File</label>
        <input type='file' id='upload-btnr'/>
    </div>
    <div className='btn_btn'>
        <button className='btn-newer'>Upload</button>
    </div>
      
    </div>
  )
}

export default Upload
