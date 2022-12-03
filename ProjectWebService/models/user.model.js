// user.model.js
const mongoose = require('mongoose');
const Facility = require('./facility.model');
// Setup schema
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, 'Please fill in a valid email'],
    },
    password: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: false,
    },
    dossier_id: {
        type: String,
        required: false,
    },
    facilities:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'facility',
        required: false,
    }],
    deleted:{
        type: Boolean,
        default: false,
    },
    
});
// Export user model
const User = mongoose.model('user', userSchema);
module.exports = User;
module.exports.get = (callback, limit) => {
    User.find(callback).limit(limit);
};
