// Departments.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './styles.css'; // Import the CSS file

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:3001/departments");
            setDepartments(response.data);
        } catch (error) {
            console.error("Failed to fetch departments:", error);
            alert("Failed to fetch departments");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3001/department/${id}`);
            setDepartments(departments.filter(department => department._id !== id));
            alert("Department deleted successfully");
        } catch (error) {
            console.error("Failed to delete department:", error);
            alert("Failed to delete department");
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="departments-container">
            <div className="departments-header">
                <h2>Departments</h2>
                <Link to="/createDepartment" className="create-department-link">Create Department</Link>
            </div>
            <table className="department-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department._id} className="department-list-item">
                            <td>{department.name}</td>
                            <td>
                                <Link to={`/department/${department._id}`} className="view-users-link">View Users</Link>
                                <button className="delete-button" onClick={() => handleDelete(department._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Departments;
