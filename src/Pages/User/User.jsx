import React from 'react'
import "./User.css"
import { BsTrash } from "react-icons/bs"
import { MdBlock } from "react-icons/md"

export const User = () => {
    return (
        <div className="user_wrapper">
            <div className="user_create">
                <h1>Create User</h1>
                <input type="text" name="" id="" />
            </div>
            <div className="user_delete">
                <div className="user_del_header">
                    <h1>Delete User</h1>
                    <BsTrash />
                </div>
                <input type="text" name="" id="" />
            </div>
            <div className="user_blocked">
                <div className="user_blocked_header">
                    <h1>Suspended-Block User</h1>
                    <MdBlock />
                </div>
                <input type="text" name="" id="" />
            </div>
        </div>
    )
}
