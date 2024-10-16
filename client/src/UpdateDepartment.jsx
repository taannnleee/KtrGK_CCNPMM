import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './styles.css'; // Import the CSS file

const UpdateDepartment = () => {
    const [department, setDepartment] = useState({ name: "" });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            const response = await axios.get(`http://localhost:3001/department/${id}`);
            setDepartment(response.data);
        };
        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/updateDepartment/${id}`, department);
            alert("Department updated successfully");
            navigate("/departments");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="update-form-container">
            <h1 className="update-form-header">Update Department</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Department Name"
                    value={department.name}
                    onChange={handleChange}
                    required
                    className="update-form-input"
                />
                <button type="submit" className="update-form-button">Update Department</button>
            </form>
        </div>
    );
};

export default UpdateDepartment;
