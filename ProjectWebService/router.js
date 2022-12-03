const express = require("express");
const Task = require("./models/task.model");
const Facility = require("./models/facility.model");

const router = express.Router();

// Import controllers
const taskController = require('./controllers/task.controller');
const facilityController = require('./controllers/facility.controller');
const userController = require('./controllers/user.controller');


//#region Facility
router
  .route('/facilities')
  .get(facilityController.index)
  .post(facilityController.new);
router
  .route('/facility/:facility_id')
  .get(facilityController.view)
  .put(facilityController.update)
  .delete(facilityController.delete);
router
  .route('/facility/bindToUser/:facility_id')
  .put(facilityController.addUsers)
router
  .route('/facility/unbindToUser/:facility_id')
  .put(facilityController.removeUsers);
//#endregion

//#region Task
router
  .route('/tasks')
  .get(taskController.index)
  .post(taskController.new);
router
  .route('/task/:task_id')
  .get(taskController.view)
  .put(taskController.update)
  .delete(taskController.delete);
router
  .route('/task/bindToTask/:task_id')
  .put(taskController.addTasks);
//#endregion

//#region User
router
  .route('/users')
  .get(userController.index)
  .post(userController.new);
router
  .route('/user/:user_id')
  .get(userController.view)
  .put(userController.update)
  .delete(userController.delete);
router
  .route('/user/bindToFacility/:user_id')
  .put(userController.addFacility)
  .delete(userController.removeFacility);

//#endregion

// Export API routes
module.exports = router;