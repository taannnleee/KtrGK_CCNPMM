
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <Link to="/create">Add User</Link>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.fullName} - {user.position}
                        <Link to={`/update/${user._id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
