import express from 'express';
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { createCategoryController } from '../controllers/createCategoryController.js';
import { updateCategoryController } from '../controllers/createCategoryController.js';
import { categoryController } from '../controllers/createCategoryController.js';
import { singleCategoryController } from '../controllers/createCategoryController.js';
import { deleteCategoryController } from '../controllers/createCategoryController.js';
const router = express.Router()

//routes

// create category
router.post('/create-category', requireSignIn,isAdmin,createCategoryController);



// update category
router.put('/update-category/:id' , requireSignIn , isAdmin,updateCategoryController);
// get all categories
router.get('/get-category',categoryController);
// get single categories
router.get('/single-category/:slug',singleCategoryController);
//delete category
router.delete('/delete-category/:id' , requireSignIn , isAdmin,deleteCategoryController);
export default router 