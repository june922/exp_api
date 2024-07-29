import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createEngineController } from '../controllers/createEnginecontroller.js';
import { updateEngineController } from '../controllers/createEnginecontroller.js';
import { engineController } from '../controllers/createEnginecontroller.js';
import { singleEngineController } from '../controllers/createEnginecontroller.js';
import { deleteEngineController } from '../controllers/createEnginecontroller.js';
const router = express.Router()

//routes

// create make
router.post('/create-engine', requireSignIn,isAdmin,createEngineController);



// update make
router.put('/update-engine/:id' , requireSignIn , isAdmin,updateEngineController);
// get all make
router.get('/get-engine',engineController);
// get single categories
router.get('/single-engine/:slug',singleEngineController);
//delete category
router.delete('/delete-engine/:id' , requireSignIn , isAdmin,deleteEngineController);
export default router 