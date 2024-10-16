import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './styles.css'; // Import the CSS file

function UpdateUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", position: "nhân viên", address: "" }); // Set default position

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/updateUser/${userId}`, user);
            navigate(`/department/${user.department}`); // Redirect to department after updating user
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    return (
        <div className="update-form-container">
            <h1 className="update-form-header">Update User</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={user.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                    className="update-form-input" 
                />
                {/* Change position input to select */}
                <select 
                    name="position" 
                    value={user.position} 
                    onChange={handleChange} 
                    required 
                    className="update-form-input"
                >
                    <option value="nhân viên">Nhân viên</option>
                    <option value="trưởng phòng">Trưởng phòng</option>
                    <option value="phó phòng">Phó phòng</option>
                </select>
                <input 
                    type="text" 
                    name="address" 
                    value={user.address} 
                    onChange={handleChange} 
                    placeholder="Address" 
                    required 
                    className="update-form-input" 
                />
                <button type="submit" className="update-form-button">Update User</button>
            </form>
        </div>
    );
}

export default UpdateUser;
