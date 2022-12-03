// task.model.js
const mongoose = require('mongoose');
// Setup schema
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    symbol: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    public_template: {
        type: Boolean,
        required: true,
    },
    private_template: {
        type: Boolean,
        required: true,
    },
    user_id: {
        type: String,
        required: false,
    },
    duration: {
        type: String,
        required: false,
    },
    tasks: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        time: {
            type: String,
            match: [/\d{2}:\d{2}/, 'Please fill in a correct timestamp']
        },
        position: {
            type: Number,
            required: true,
        },

    }]
    ,
    deleted: {
        type: Boolean,
        default: false,
    },
});
// Export task model
const Task = mongoose.model('task', taskSchema);
module.exports = Task;
module.exports.get = (callback, limit) => {
    Task.find(callback).limit(limit);
};
