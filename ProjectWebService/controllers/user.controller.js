// userController.js
// Import user model
const User = require('../models/user.model');
const Facility = require('../models/facility.model');

exports.index = (req, res) => {
    User.find({ deleted: false }, (err, users) => {
        if (err) {
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users,
        });
    });
};

// Handle create user actions
exports.new = (req, res) => {
    const user = new User();
    const userObj = req.body;
    Object.keys(userObj).forEach((key) => {
        user[key] = userObj[key];
    });

    // save the user and check for errors
    user.save((userError) => {
        if (userError) {
            res.status(400).json({
                status: 'error',
                error: userError,
            });
        }
        else {
            res.status(201).json({
                message: 'New user created!',
                data: user,
            });
        }
    });
};

// Handle view user info
exports.view = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.json({
                message: 'User details loading..',
                data: user,
            });
        }
    });
};

// Handle update user info
exports.update = (req, res) => {
    User.findByIdAndUpdate(
        req.params.user_id,
        req.body,
        { new: true, runValidators: true },
        (err, user) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.json({
                    message: 'User Info updated',
                    data: user,
                });
            }
        },
    );
};

// Handle delete state
exports.delete = (req, res) => {
    User.findByIdAndUpdate(
        req.params.user_id,
        { deleted: true },
        { new: true, runValidators: true },
        (err, user) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.json({
                    message: 'User Info updated',
                    data: user,
                });
            }
        },
    );
};

// Handle binding to facility
exports.addFacility = (req, res) => {
    User.findByIdAndUpdate(
        req.params.user_id,
        { $addToSet: { facilities: req.body['facility_id'] } },
        { new: true, runValidators: true },
        (err, user) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                Facility.findByIdAndUpdate(
                    req.body.facility_id,
                    { $addToSet: { users: req.params.user_id } },
                    { new: true, runValidators: true },
                    (err, facility) => {
                        if (err) {
                            res.status(400).json({
                                status: 'error',
                                error: err,
                            });
                        } else {
                            res.json({
                                message: 'Facility added to user and user added to facility',
                                data: user,
                            });
                        }
                    },
                );
            }
        },
    );
};

// Handle unbinding to facility
exports.removeFacility = (req, res) => {
    User.findByIdAndUpdate(
        req.params.user_id,
        { $pullAll: { facilities: [req.body.facility_id] } },
        { new: true, runValidators: true },
        (err, user) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                Facility.findByIdAndUpdate(
                    req.body.facility_id,
                    { $pullAll: { users: [req.params.user_id] } },
                    { new: true, runValidators: true },
                    (err, facility) => {
                        if (err) {
                            res.status(400).json({
                                status: 'error',
                                error: err,
                            });
                        } else {
                            res.json({
                                message: 'Facility removed from user and user removed from facility',
                                data: user,
                            });
                        }
                    },
                );

            }
        },
    );

};