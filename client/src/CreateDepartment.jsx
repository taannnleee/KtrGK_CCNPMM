// CreateDepartment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const CreateDepartment = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/createDepartment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Department created:', data);
                navigate('/departments'); // Redirect to the departments list
            })
            .catch((error) => {
                console.error('Error creating department:', error);
                alert('Failed to create department');
            });
    };

    return (
        <div className='create-form-container'>
            <h1 className='create-form-header'>Add Department</h1>
            <form onSubmit={handleSubmit} className='create-form'>
                <input
                    type='text'
                    name='name'
                    placeholder='Department Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='department-form-input'
                />
                <button type='submit' className='create-form-button'>
                    Create Department
                </button>
            </form>
        </div>
    );
};

export default CreateDepartment;
