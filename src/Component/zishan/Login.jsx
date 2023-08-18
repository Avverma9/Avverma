import React,{useState} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Login=()=> {
    const navigate = useNavigate();
    const location = useLocation();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailselect,setEmailselect] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const emailclick = ()=>{
        setEmailselect(true)
    }
    const phoneclick = ()=>{
        setEmailselect(false)
    }
    const handleSignIn=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await fetch("https://hotel-backend-tge7.onrender.com/signin",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({email,password})
            }
            )
            if (response.ok){
                const data = await response.json();
                const {userId} = data;
                localStorage.setItem("isSignedIn","true")
                localStorage.setItem("userid",userId);
                navigate('/profile');
                
            }
            else{
                console.log("sign in failed");
            }
        }catch (error){
            console.error("error",error)
        }finally {
            setIsLoading(false); // Set loading state to false after the request is complete
          }
    }
    const passwordvisible = ()=>{
        setShowPassword(!showPassword);

    }
    if (location.pathname !=="/login"){
        return null;
    }
    return (
        <form onSubmit={handleSignIn}>
        <div className='login-container'>
        <div className='login-page'>
            <div className='login-text'>
                <h2>Login</h2>
                <h4>dont have an account? <a href="/registera">Register</a></h4>
            </div>
            <div className='login-head'>
                <h2 className={`clickable-heading ${emailselect?'selected':''}`} onClick={emailclick}>Email</h2>
                <h2 className={`clickable-heading ${!emailselect?'selected':''}`} onClick={phoneclick}>Phone Number</h2>
            </div>
            <div className='input-fields'>
            {emailselect?(
                <>
                <input type='email' id='email-field' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type={showPassword?"text":"password"} id='password-field' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </>
            ):(
                <>
            <input type='text' id='phone-field' placeholder='Enter Phone Number' />
            <button className='otp-btn'>Get OTP</button>
            </>
            )}
            </div>
            {emailselect&&(
            <div className='sign-in-btn'>
                <button className='login-btn'>Sign-In</button>
            </div>
            )}


        </div>
        <div className='image-right'>
        <img src='https://rurutek.com/jio/assets/img/login-animate.gif' alt='image'/>
        </div>
        </div>
        </form>
    )
}

export default Login
