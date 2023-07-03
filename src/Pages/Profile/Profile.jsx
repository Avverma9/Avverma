import React from 'react'
import { BiSolidCamera } from "react-icons/bi";
import "./Profile.css"

export const Profile = () => {
    return (
        <>
            <div className="profile_header">
                <h1>Edit Profile</h1>
                <div className="user_avatar">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F220%2Fthumb-1920-220919.jpg&f=1&nofb=1&ipt=10bec20d3743c069bb465ccad8695f921eb647726cccac72a4f8ccd3d4ce0fd3&ipo=images"
                        alt="John Wick"
                    />
                    <BiSolidCamera />
                </div>
            </div>
            <div className="profile_body">
                <div className="profile_form_body">
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>First Name</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>Last Name</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>Contact Number</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>Email Address</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>Address</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <textarea name="" id="" cols="30" rows="10" ></textarea>
                    </div>
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>Start Time</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>End Time</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>Pan card</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                </div>
            </div>
        </>
    )
}
