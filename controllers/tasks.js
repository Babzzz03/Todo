const Task = require('../models/Task');
const user = require("../models/user");
const asyncWrapper = require ("../middleware/async");
const {createCustomError} = require ('../errors/custom-error')

const createUser = asyncWrapper(async (request, response) => {
    const { email, password, name } = request.body;
    if (!email & !password & !name) {
      return response.status(400).send({
        msg: `please provide neccessary credentials`,
      });
    }

    if (!email) {
      return response.status(400).send({
        msg1: `please provide Email`,
      });
    }
    if (!password) {
      return response.status(400).send({
        msg2: `please provide password`,
      });
    }
    if (!name) {
      return response.status(400).send({
        msg3: `please provide username`,
      });
    }
 
  const users = await user.create({ ...request.body });
  console.log(users)
const token = users.createJWT();
 response
    .status(200)
    .json({ user: { name: users.name, email: users.email }, token });
});


const authenticateUser = asyncWrapper(async (request, response) => {
 const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).send({ msg1: `please provide Email and password`});
  }
     const users = await user.findOne({ email });
     if (!users) {
       response
         .status(500)
         .send({
           msg: "no user with the below credentials.. check again/sign-up",
         });
     }
      const isPasswordCorrect = await users.comparePassword(password);
if (!isPasswordCorrect) {
  response
    .status(500)
    .send({ msg2: "invalid credentials please check password" });
}
  const token = users.createJWT();
 return response.status(200).json({ user: { name: users.name }, token });
});

const getAllUsers = asyncWrapper(async (request, response) => {
   const cart = await user.find({ createdBy: request.user.userId });
   return response.status(200).send({ username: request.user.name });
});



const getAllTasks = asyncWrapper (async (request, response) => {
  console.log(request.user.userId);
    const task = await Task.find({ createdBy: request.user.userId }).sort(
      "createdAt"
    );
    return response.status(200).send({ task, count: task.length });
  
})

const createTask = asyncWrapper(async (request, response) => {
 request.body.createdBy = request.user.userId;
  const task = await Task.create(request.body)
    response.status(201).json({task})
 return response.send(request.body);
})

const getTask =  asyncWrapper(async (request, response) => {
 
    const {
      user: { userId },
      params: { id: jobId },
    } = request;
    console.log(request.params)
       const cart = await Task.findOne({
         _id: jobId,
         createdBy: userId,
       });
  
    if (!cart) {
      response.status(400).send(`no job with id ${cart}`);
    }
   return response.status(200).send({ cart });

});

const updateTask = asyncWrapper(async (request, response) => {
  
    const {
      body: { title, image },
      user: { userId },
      params: { id: jobId },
    } = request;

    if (title === "" || image === "") {
      response.status(400).send(`title or image cannot be empty`);
    }

     const task = await Task.findByIdAndUpdate(
       {
         _id: jobId,
         createdBy: userId,
       },
       request.body,
       { new: true, runValidators: true }
     );

     if (!task) {
      return next(createCustomError(`No task with id : ${taskID}`, 404));
     }

     response.status(200).json({task})
 
});

const deleteTask = asyncWrapper(async (request, response) => {
  
    const {
      user: { userId },
      params: { id: jobId },
    } = request;
    const task = await Task.findByIdAndDelete({
      _id: jobId,
      createdBy: userId,
    });
    if (!task) {
     return next(createCustomError(`No task with id : ${taskID}`, 404));
    }
  return  response.status(200).json({ task });
   
});


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    createUser,
    authenticateUser,
    getAllUsers,
}