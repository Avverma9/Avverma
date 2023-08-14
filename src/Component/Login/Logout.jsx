import React,{useNavigate} from "react";

const Logout=()=>{
    const navigate=useNavigate()
   

    const handleLogout=(e)=>{
        localStorage.removeItem("token")
        alert("logged out")
        navigate("/sign-in")
    }
    

    return (
        <>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}
export default Logout