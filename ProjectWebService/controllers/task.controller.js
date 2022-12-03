// taskController.js
// Import task model
const Task = require('../models/task.model');

exports.index = (req, res) => {
    Task.find({ deleted: false }, (err, tasks) => {
        if (err) {
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: 'success',
            message: 'Tasks retrieved successfully',
            data: tasks,
        });
    });
};

// Handle create task actions
exports.new = (req, res) => {
    const task = new Task();
    const taskObj = req.body;
    Object.keys(taskObj).forEach((key) => {
        task[key] = taskObj[key];
    });
    // save the task and check for errors
    task.save((taskError) => {
        if (taskError) {
            res.status(400).json({
                status: 'error',
                error: taskError,
            });
        }
        else {
            res.status(201).json({
                message: 'New task created!',
                data: task,
            });
        }
    });
};

// Handle view task info
exports.view = (req, res) => {
    Task.findById(req.params.task_id, (err, task) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.json({
                message: 'Task details loading..',
                data: task,
            });
        }
    });
};

// Handle update task info
exports.update = (req, res) => {
    Task.findByIdAndUpdate(
        req.params.task_id,
        req.body,
        { new: true, runValidators: true },
        (err, task) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.json({
                    message: 'Task Info updated',
                    data: task,
                });
            }
        },
    );
};

// Handle delete state
exports.delete = (req, res) => {
    Task.findByIdAndUpdate(
        req.params.task_id,
        { deleted: true },
        { new: true, runValidators: true },
        (err, task) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.json({
                    message: 'Task Info updated',
                    data: task,
                });
            }
        },
    );
};

// Handle binding to task
exports.addTasks = (req, res) => {
    Task.findByIdAndUpdate(
        req.params.task_id,
        { tasks: req.body.tasks },
        { new: true, runValidators: true },
        (err, task) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.json({
                    message: 'Tasks added to Task',
                    data: task,
                });
            }
        },
    );
};
