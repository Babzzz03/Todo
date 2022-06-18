const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");


const { getAllTasks, createTask, updateTask, deleteTask, getTask, createUser, authenticateUser, getAllUsers} = require("../controllers/tasks");
router.route("/register").post(createUser);
router.route("/login").post(authenticateUser);
router.route("/user").get(authMiddleware, getAllUsers);
router.route("/").get(authMiddleware, getAllTasks).post(authMiddleware, createTask);

router
  .route("/:id")
  .get(authMiddleware, getTask)
  .patch(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);


module.exports = router;
