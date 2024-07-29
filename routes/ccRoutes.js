import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createCcController } from '../controllers/createCccontroller.js';
import { updateCcController } from '../controllers/createCccontroller.js';
import { ccController } from '../controllers/createCccontroller.js';
import { singleCcController } from '../controllers/createCccontroller.js';
import { deleteCcController } from '../controllers/createCccontroller.js';
const router = express.Router()

//routes

// create make
router.post('/create-cc', requireSignIn,isAdmin,createCcController);



// update make
router.put('/update-cc/:id' , requireSignIn , isAdmin,updateCcController);
// get all make
router.get('/get-cc',ccController);
// get single categories
router.get('/single-cc/:slug',singleCcController);
//delete category
router.delete('/delete-cc/:id' , requireSignIn , isAdmin,deleteCcController);
export default router 