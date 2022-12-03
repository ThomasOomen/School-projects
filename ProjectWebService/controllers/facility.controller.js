// facilityController.js
// Import facility model
const Facility = require('../models/facility.model');
const User = require('../models/user.model');

exports.index = (req, res) => {
    Facility.find({ deleted: false }, (err, facilities) => {
        if (err) {
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: 'success',
            message: 'Facility retrieved successfully',
            data: facilities,
        });
    });
};

// Handle create facility actions
exports.new = (req, res) => {
    const facility = new Facility();
    const facilityObj = req.body;
    Object.keys(facilityObj).forEach((key) => {
        facility[key] = facilityObj[key];
    });

    // save the facility and check for errors
    facility.save((facilityError) => {
        if (facilityError) {
            res.status(400).json({
                status: 'error',
                error: facilityError,
            });
        }
        else {
            res.status(201).json({
                message: 'New facility created!',
                data: facility,
            });
        }
    });
};

// Handle view facility info
exports.view = (req, res) => {
    Facility.findById(req.params.facility_id, (err, facility) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                error: err,
            });
        }
        else {
            res.json({
                message: 'Facility details loading..',
                data: facility,
            });
        }
    });
};

// Handle update facility info
exports.update = (req, res) => {
    Facility.findByIdAndUpdate(
        req.params.facility_id,
        req.body,
        { new: true, runValidators: true },
        (err, facility) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.json({
                    message: 'Facility Info updated',
                    data: facility,
                });
            }
        },
    );
};

// Handle delete state
exports.delete = (req, res) => {
    Facility.findByIdAndUpdate(
        req.params.facility_id,
        { deleted: true },
        { new: true, runValidators: true },
        (err, facility) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                res.json({
                    message: 'Facility Info updated',
                    data: facility,
                });
            }
        },
    );
};

// Handle add users to a facility
exports.addUsers = (req, res) => {
    Facility.findByIdAndUpdate(
        req.params.facility_id,
        { $addToSet: { users: req.body['user_id'] } },
        { new: true, runValidators: true },
        (err, facility) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                for (let i = 0; i < req.body['user_id'].length; i++) {
                    const currentUser_id = req.body['user_id'][i];
                    User.findByIdAndUpdate(
                        currentUser_id,
                        { $addToSet: { facilities: req.params.facility_id } },
                        { new: true, runValidators: true },
                        (err, user) => {
                            if (err) {
                                res.status(400).json({
                                    status: 'error',
                                    error: err,
                                });
                            }
                        },
                    );
                }
                res.json({
                    message: 'Facility added to user and user added to facility',
                    data: facility,
                });
            }
        },
    );
};

// Handle unbinding users from facility
exports.removeUsers = (req, res) => {
    Facility.findByIdAndUpdate(
        req.params.facility_id,
        { $pullAll: { users: req.body.user_id } },
        { new: true, runValidators: true },
        (err, facility) => {
            if (err) {
                res.status(400).json({
                    status: 'error',
                    error: err,
                });
            }
            else {
                for (let i = 0; i < req.body.user_id.length; i++) {
                    const currentUser_id = req.body.user_id[i];
                    User.findByIdAndUpdate(
                        currentUser_id,
                        { $pullAll: { facilities: [req.params.facility_id] } },
                        { new: true, runValidators: true },
                        (err, user) => {
                            if (err) {
                                res.status(400).json({
                                    status: 'error',
                                    error: err,
                                });
                            }
                        },
                    );
                }
                res.json({
                    message: 'Facility removed from user and user removed from facility',
                    data: facility,
                });
            }
        },
    );

};