// facility.model.js
const mongoose = require('mongoose');
// Setup schema
const facilitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill in a valid email address']
    },
    phonenumber: {
        type: String,
        required: true,
        match: [/(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/, 'Please fill in a valid phonenumber']
    },
    zipcode: {
        type: String,
        required: true,
        match: [/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i, 'Please fill in a valid zipcode']
    },
    housenumber: {
        type: String,
        required: true,
    },
    deleted:{
        type: Boolean,
        default: false,
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false,
    }]
});
// Export facility model
const Facility = mongoose.model('facility', facilitySchema);
module.exports = Facility;
module.exports.get = (callback, limit) => {
    Facility.find(callback).limit(limit);
};
