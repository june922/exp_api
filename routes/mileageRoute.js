import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createMileageController } from '../controllers/createMileagecontroller.js';
import { updateMileageController } from '../controllers/createMileagecontroller.js';
import { mileageController } from '../controllers/createMileagecontroller.js';
import { singleMileageController } from '../controllers/createMileagecontroller.js';
import { deleteMileageController } from '../controllers/createMileagecontroller.js';
const router = express.Router()

//routes

// create make
router.post('/create-mileage', requireSignIn,isAdmin,createMileageController);



// update make
router.put('/update-mileage/:id' , requireSignIn , isAdmin,updateMileageController);
// get all make
router.get('/get-mileage',mileageController);
// get single categories
router.get('/single-mileage/:slug',singleMileageController);
//delete category
router.delete('/delete-mileage/:id' , requireSignIn , isAdmin,deleteMileageController);
export default router 