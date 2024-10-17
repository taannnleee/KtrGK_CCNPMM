const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const DepartmentModel = require('./models/Department');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// User endpoints

app.post("/createUser/:departmentId", async (req, res) => {
    try {
        const { departmentId } = req.params; // Get departmentId from the URL
        const departmentExists = await DepartmentModel.findById(departmentId);

        if (!departmentExists) {
            return res.status(400).json({ error: "Department not found" });
        }

        // Create the user and associate with the department
        const user = await UserModel.create({ ...req.body, department: departmentId });

        // Optionally, update the department to include this user
        await DepartmentModel.findByIdAndUpdate(departmentId, { $push: { users: user._id } });

        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get a user by ID
app.get('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to update a user
app.put('/updateUser/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint to delete a user
app.delete('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Remove the user reference from the department
        await DepartmentModel.findByIdAndUpdate(user.department, { $pull: { users: user._id } });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to create a department
app.post("/createDepartment", async (req, res) => {
    try {
        const department = await DepartmentModel.create(req.body);
        res.status(201).json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint to get all departments
app.get('/departments', async (req, res) => {
    try {
        const departments = await DepartmentModel.find().populate('users'); // Populate users
        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get users in a department
app.get('/department/:id', async (req, res) => {
    try {
        const department = await DepartmentModel.findById(req.params.id).populate('users'); // Populate users
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json(department);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to delete a department
app.delete('/department/:id', async (req, res) => {
    try {
        const department = await DepartmentModel.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json({ message: "Department deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
