import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Register.css';

const Registera = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [gender,setGender] = useState("");
  const [address,setAddress] = useState("");
  const [mobile,setMobile] =useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      };
      const handleFormSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",name);
        formData.append("email",email);
        formData.append("password",password);
        formData.append("mobile",mobile);
        formData.append("gender",gender);
        formData.append("address",address);


        try{
          const response = await fetch("https://hotel-backend-tge7.onrender.com/signup",
          {
            method:"POST",
            body:formData,
          }
          );
          if (response.ok){
            console.log(response,"successfully registered");
            setName("");
            setEmail("");
            setAddress("");
            setMobile("");
            setPassword("");
            setGender("");
            setSelectedImage(null);
            navigate('/login');
          }
          else{
            console.log("sign up failed");
          }
        }catch (error){
          console.log(error,"error");
        }

      }
      if (location.pathname!=="/registera"){
        return null;
      }
      const handleSignInClick=()=>{
        navigate("/login")
      }

    return (
      <>
      <form onSubmit={handleFormSubmit} className='form-containers'>
        <div className='register-container'>
      
            <div className='register-page'>
            <div className='img-flex'>
                <div className='register-text'>
                    <h2>Register</h2>
                    <h4>dont have an account? <a href="/login">Log in</a></h4>
                </div>
                <div className="register-input-group">
            <div className="register-image-preview">
              {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
              )}
            </div>
            <label htmlFor="profile-image" className="upload-button-register">
              Select Profile Picture
              <br />
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            
          </div>
                </div>
                <div className='input-fields'>
                    <input type='email' id='email-field' placeholder='enter-email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type='text' id='mobile-field' placeholder='enter-mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
                    <input type='password' id='password-field' placeholder='enter-password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <input type='text' id='name-field' placeholder='enter-name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type='text' id='gender-field' placeholder='enter-gender' value={gender} onChange={(e)=>setGender(e.target.value)}/>
                    <input type='text' id='address-field' placeholder='enter-address' value={address} onChange={(e)=>setAddress(e.target.value)}/>

                </div>
                <div className='register-in-btn'>
                    <button className='register-btn'>Register</button>
                </div>
            </div>
            <div className='image-right'>
                <img src='https://cdn.dribbble.com/users/1917942/screenshots/7139971/media/d802dc4eadb049f5a9684759cfdfbffa.gif' alt='image' />
            </div>

        </div>
        </form>
        <div className="last-message">Already have an account?</div>
      <button type="submit-sign" onClick={handleSignInClick}>
        Sign in
      </button>
      </>
    )
}

export default Registera
