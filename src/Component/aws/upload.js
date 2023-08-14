import React, { useState } from 'react';
import AWS from 'aws-sdk';

// Configure AWS SDK with your credentials and S3 bucket information
AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_KEY',
  region: 'YOUR_S3_BUCKET_REGION',
});

const s3 = new AWS.S3();

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const params = {
      Bucket: 'YOUR_S3_BUCKET_NAME',
      Key: selectedFile.name,
      Body: selectedFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading image:', err);
      } else {
        console.log('Image uploaded successfully:', data.Location);
      }
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

export default ImageUpload;
