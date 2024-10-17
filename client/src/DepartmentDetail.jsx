import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const DepartmentDetails = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/department/${id}`);
                setDepartment(response.data);
            } catch (error) {
                console.error('Error fetching department:', error);
            }
        };
        fetchDepartment();
    }, [id]);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/user/${userId}`);
            alert('User deleted successfully');
            
            const updatedDepartment = await axios.get(`http://localhost:8080/department/${id}`);
            setDepartment(updatedDepartment.data);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (!department) return <div>Loading...</div>;

    return (
        <div>
            <h1>{department.name}</h1>
            <h2>Staff</h2>
            
            <Link to={`/createUser/${id}`}>
                <button>Add Staff</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {department.users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.position}</td>
                            <td>{user.address || 'No address provided'}</td>
                            <td>
                                <Link to={`/updateUser/${user._id}`}>Edit</Link>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/departments'>Back to Departments</Link>
        </div>
    );
};

export default DepartmentDetails;
