import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createfuelTypeController } from '../controllers/createfuelTypecontroller.js';
import { updatefuelTypeController } from '../controllers/createfuelTypecontroller.js';
import { fuelTypeController } from '../controllers/createfuelTypecontroller.js';
import { singlefuelTypeController } from '../controllers/createfuelTypecontroller.js';
import { deletefuelTypeController } from '../controllers/createfuelTypecontroller.js';
const router = express.Router()

//routes

// create make
router.post('/create-fuelType', requireSignIn,isAdmin,createfuelTypeController );



// update make
router.put('/update-fuelType/:id' , requireSignIn , isAdmin,updatefuelTypeController);
// get all make
router.get('/get-fuelType',fuelTypeController);
// get single categories
router.get('/single-fuelType/:slug',singlefuelTypeController);
//delete category
router.delete('/delete-fuelType/:id' , requireSignIn , isAdmin,deletefuelTypeController);
export default router 