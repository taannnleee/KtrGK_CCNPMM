const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' } // Reference to the department
});

module.exports = mongoose.model('User', UserSchema);
