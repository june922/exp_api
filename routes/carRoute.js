import express from 'express'
import { isAdmin, requireSignIn } from '../middlewears/authMiddleware.js';
import { createCarController ,
         getCarController,
        } 
      from '../controllers/carController.js';
 import { getSingleCarController } from '../controllers/carController.js';
 import { carPhotoController } from '../controllers/carController.js';
 import { deleteCarController } from '../controllers/carController.js';
 import { updateCarController } from '../controllers/carController.js';
import formidable from 'express-formidable';
const router = express.Router()

//routes

router.post('/create-car', requireSignIn,isAdmin,formidable(),createCarController);
//update car
router.put('/update-car/:pid', requireSignIn,isAdmin,formidable(),updateCarController);

//get all cars
router.get('/get-car',getCarController);

// get single car

router.get('/get-car/:slug',getSingleCarController);
//get photo

router.get('/car-photo/:id',carPhotoController);
// delete photo
router.get('/car/:pid',deleteCarController);
export default router;