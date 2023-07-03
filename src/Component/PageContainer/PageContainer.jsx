import React from 'react'
import { BiSolidCamera } from "react-icons/bi"
import "./PageContainer.css"

export const PageContainer = () => {
    return (
        <div className="page_container">
            <div className="page_header">
                <h1>Edit Profile</h1>
                <div className="user_avatar">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F220%2Fthumb-1920-220919.jpg&f=1&nofb=1&ipt=10bec20d3743c069bb465ccad8695f921eb647726cccac72a4f8ccd3d4ce0fd3&ipo=images" alt="John Wick" />
                    <BiSolidCamera />
                </div>
            </div>
            <div className="page_body">
                <div className="form_body">
                    <div className="input_field">
                        <div className="input_field_header">
                            <h1>First Name</h1>
                            <input type="button" value="Edit" />
                        </div>
                        <input type="text" name="" id="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
