import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createTransmissionController } from '../controllers/createTransmissioncontroller.js';
import { updateTransmissionController } from '../controllers/createTransmissioncontroller.js';
import { transmissionController } from '../controllers/createTransmissioncontroller.js';
import { singleTransmissionController } from '../controllers/createTransmissioncontroller.js';
import { deleteTransmissionController } from '../controllers/createTransmissioncontroller.js';
const router = express.Router()

//routes

// create make
router.post('/create-transmission', requireSignIn,isAdmin,createTransmissionController);



// update make
router.put('/update-transmission/:id' , requireSignIn , isAdmin,updateTransmissionController);
// get all make
router.get('/get-transmission',transmissionController);
// get single categories
router.get('/single-transmission/:slug',singleTransmissionController);
//delete category
router.delete('/delete-transmission/:id' , requireSignIn , isAdmin,deleteTransmissionController);
export default router 