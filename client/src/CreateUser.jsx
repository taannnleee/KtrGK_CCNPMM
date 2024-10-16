// CreateUser.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css'; // Import the CSS file

function CreateUser() {
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", position: "", address: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/createUser/${departmentId}`, user);
            alert("User created successfully");
            navigate(`/department/${departmentId}`); // Redirect to department after adding user
        } catch (error) {
            console.error("Failed to create user:", error);
            alert("Failed to create user");
        }
    };

    return (
        <div className="create-form-container">
            <h1 className="create-form-header">Add Staff</h1>
            <form onSubmit={handleSubmit} className="create-form">
                <input 
                    type="text" 
                    name="name" 
                    value={user.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                    className="create-form-input" 
                />
                
                {/* Replace Position Text Input with Select Dropdown */}
                <select
                    name="position"
                    value={user.position}
                    onChange={handleChange}
                    required
                    className="create-form-input"
                >
                    <option value="" disabled>Select Position</option>
                    <option value="Nhân viên">Nhân viên</option>
                    <option value="Trưởng phòng">Trưởng phòng</option>
                    <option value="Phó phòng">Phó phòng</option>
                </select>
                
                <input 
                    type="text" 
                    name="address" 
                    value={user.address} 
                    onChange={handleChange} 
                    placeholder="Address" 
                    required 
                    className="create-form-input" 
                />
                <button type="submit" className="create-form-button">Add Staff</button>
            </form>
        </div>
    );
}

export default CreateUser;
