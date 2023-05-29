/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';
import './Profile.css';

const UpdateProfile = ({ userData, onCancel, onUpdateDone }) => {
    
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [mobile, setMobile] = useState(userData.mobile);
  const [address, setAddress] = useState(userData.address);
  const [images, setImages] = useState([]);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('address', address);

      // Append the image only if it is provided by the user
      if (images.length > 0) {
        formData.append('images', images[0]); // Assuming only one image is selected
      }

      const response = await fetch(`http://localhost:5000/user/${userData._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setShowUpdateMessage(true);
        onUpdateDone(); // Call the onUpdateDone callback
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };

  return (
    <div className="update-profile-container">
      {showUpdateMessage ? (
        <div className="card">
          <img src="https://cdn.pixabay.com/animation/2023/01/11/09/50/09-50-35-326_512.gif" alt="" />
          <p>Updated</p>
        </div>
      ) : (
        <>
          <h1 className="update-profile-heading">Update Profile</h1>
          <form onSubmit={handleUpdate} className="update-profile-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <label htmlFor="images">Images:</label>
            <input
              type="file"
              id="images"
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
            />
            <button type="submit">Update</button>
            <div className='cancel-update'> <button type="button" onClick={onCancel}>
              Cancel
            </button></div>
           
          </form>
        </>
      )}
    </div>
  );
};

const Profile = () => {
    const location= useLocation()
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    if (!isSignedIn) {
      navigate('/signin');
    } else {
      const userId = localStorage.getItem('userId');
      fetch(`http://localhost:5000/get/${userId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then((data) => {
          setUserData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdateDone = () => {
    setIsEditing(false);
  };
  if(location.pathname !== "/profile"){
    return null
}
  return (
    <>
    <div className="profile-container">
      <h1 className="profile-heading">Profile</h1>
      {isLoading ? (
        <img
          src="https://cdn.dribbble.com/users/1888003/screenshots/10900711/media/ee3dcf5209f7f6261c17e1e1b7cacd50.gif"
          alt="Loading"
          className="profile-loading-image"
        />
      ) : userData ? (
        <div className="profile-info">
          <div className="profile-images">
            {isEditing ? null : (
              <div className="profile-actions">
                <BsPencilSquare size={24} onClick={handleEditProfile} />
              </div>
            )}
          </div>
          {isEditing ? (
            <UpdateProfile
              userData={userData}
              onCancel={handleCancel}
              onUpdateDone={handleUpdateDone}
            />
          ) : (
            <>
              <p>
                <span className="data-label">Name:</span> {userData.name}
              </p>
              <p>
                <span className="data-label">Address:</span> {userData.address}
              </p>
              <p>
                <span className="data-label">Email:</span> {userData.email}
              </p>
              <p>
                <span className="data-label">Mobile:</span> {userData.mobile}
              </p>
              {userData.images && userData.images.length > 0 ? (
                <div className="images-container">
                  {userData.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index}`}
                      className="user-image"
                    />
                  ))}
                </div>
              ) : null}
             <button className="sign-out-button" onClick={handleSignOut}>
  <FaSignOutAlt size="24" className="logout-icon" />
</button>

            </>
          )}
        </div>
      ) : (
        
        <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1685267478~exp=1685268078~hmac=5642d37470421106c55c5de2fc5289f7626bc124ff37dbd00edb813c39967331" alt="" className='nodata' />
      )}
    </div>
    </>
  );
};

export default Profile;