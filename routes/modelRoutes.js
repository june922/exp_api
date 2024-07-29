import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createModelController } from '../controllers/createModelcontroller.js';
import { updateModelController } from '../controllers/createModelcontroller.js';
import { modelController } from '../controllers/createModelcontroller.js';
import { singleModelController } from '../controllers/createModelcontroller.js';
import { deleteModelController } from '../controllers/createModelcontroller.js';
const router = express.Router()

//routes

// create make
router.post('/create-model', requireSignIn,isAdmin,createModelController);



// update make
router.put('/update-model/:id' , requireSignIn , isAdmin,updateModelController);
// get all make
router.get('/get-model',modelController);
// get single categories
router.get('/single-model/:slug',singleModelController);
//delete category
router.delete('/delete-model/:id' , requireSignIn , isAdmin,deleteModelController);
export default router 