import React, { useState } from 'react'

import { Button, Modal } from 'react-bootstrap'

export default function UpdateProfile({ userData, show, handleClose, setProfileUpdated }) {

    const [uname, setUName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [images, setImages] = useState([]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', uname !== "" ? uname : userData?.name);
            formData.append('email', email !== "" ? email : userData?.email);
            formData.append('gender', gender !== "" ? gender : userData?.gender);
            formData.append('mobile', mobile !== "" ? mobile : userData?.mobile);
            // formData.append('address', address !== "" ? address : userData?.address);

            // Append the image only if it is provided by the user
            if (images.length > 0) {
                formData.append('images', images[0] !== "" ? images[0] : userData?.images[0]); // Assuming only one image is selected
            }
            const userId = localStorage.getItem('userId');
            const response = await fetch(`https://hotel-backend-tge7.onrender.com/user/${userId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setProfileUpdated(true);// Call the onUpdateDone callback
                handleClose()
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            // Handle error state
        }
    };


    return (

        <div className={`w-[500px] border-[1px] border-slate-300 rounded-md mx-auto my-5 fixed inset-0 flex justify-center items-center transition-colors ${show ? "visible bg-white" : "invisible"}`}>
            <div>

                <h1 className="update-profile-heading">Update Profile</h1>
                <form onSubmit={handleUpdate} className="update-profile-form">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={uname}
                        placeholder={userData?.name}
                        onChange={(e) => setUName(e.target.value)}
                    />
                    <label htmlFor="email">
                        {email === "" || email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? "Email:" : <p className="text-xs font-semibold text-red-700">Please Provide a Valid Email</p>}

                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder={userData?.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="mobile">Gender:</label>
                    <input
                        type="text"
                        id="mobile"
                        value={gender}
                        placeholder={userData?.gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="mobile">
                        {email === "" || mobile.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/) ? "Phone Number:" : <p className="text-xs font-semibold text-red-700">Please Provide a Valid Phone Number</p>}


                    </label>
                    <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        placeholder={userData?.mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className='border-slate-300 border-[0.5px] p-2 rounded-md'
                    />
                    {/* <label htmlFor="address">Address:</label> */}
                    {/* <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea> */}
                    <label htmlFor="images">Images:</label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) => setImages(e.target.files)}
                    />
                    <button type="submit">Update</button>
                </form>

            </div>
        </div>

    )

}
