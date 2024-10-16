// DepartmentUsers.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './styles.css'; // Import the CSS file

function DepartmentUsers() {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [users, setUsers] = useState([]);
    const [departmentName, setDepartmentName] = useState('');

    useEffect(() => {
        const fetchDepartmentUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/department/${id}`);
                console.log('Department Data:', response.data); // Verify data structure
                setUsers(response.data.users);
                setDepartmentName(response.data.name); // Assuming department has a name field
            } catch (error) {
                console.error('Failed to fetch department users:', error);
                alert('Failed to fetch department users.');
            }
        };

        fetchDepartmentUsers();
    }, [id]);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3001/user/${userId}`);
            setUsers(users.filter((user) => user._id !== userId)); // Remove deleted user from state
            alert('User deleted successfully');
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user.');
        }
    };

    return (
        <div className='department-users-container'>
            <div className='department-users-header'>
                <h1>Staff in {departmentName}</h1>
                <div className='header-buttons'>
                    <Link to={`/createUser/${id}`} className='add-user-link'>
                        Add Staff
                    </Link>
                    <button className='back-button' onClick={() => navigate('/departments')}>
                        Back to Departments
                    </button>
                </div>
            </div>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className='user-list-item'>
                            <td>{user.name}</td>
                            <td>{user.position}</td>
                            <td>{user.address || 'No address provided'}</td>
                            <td>
                                <Link to={`/updateUser/${user._id}`} className='update-link'>
                                    Update
                                </Link>
                                <button className='delete-button' onClick={() => handleDelete(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DepartmentUsers;
