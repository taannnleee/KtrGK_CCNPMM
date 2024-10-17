import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Users";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import Departments from "./Departments";
import CreateDepartment from "./CreateDepartment";
import UpdateDepartment from "./UpdateDepartment";
import DepartmentUsers from "./DepartmentUsers";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/createUser/:departmentId" element={<CreateUser />} />
                <Route path="/updateUser/:userId" element={<UpdateUser />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/createDepartment" element={<CreateDepartment />} />
                <Route path="/updateDepartment/:id" element={<UpdateDepartment />} />
                <Route path="/department/:id" element={<DepartmentUsers />} />
            </Routes>
        </Router>
    );
}

export default App;
