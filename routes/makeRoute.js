import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createMakeController } from '../controllers/createMakecontroller.js';
import { updateMakeController } from '../controllers/createMakecontroller.js';
import { makeController } from '../controllers/createMakecontroller.js';
import { singleMakeController } from '../controllers/createMakecontroller.js';
import { deleteMakeController } from '../controllers/createMakecontroller.js';
const router = express.Router()

//routes

// create make
router.post('/create-make', requireSignIn,isAdmin,createMakeController);



// update make
router.put('/update-make/:id' , requireSignIn , isAdmin,updateMakeController);
// get all make
router.get('/get-make',makeController);
// get single categories
router.get('/single-make/:slug',singleMakeController);
//delete category
router.delete('/delete-make/:id' , requireSignIn , isAdmin,deleteMakeController);
export default router 