import express from "express";
import {registerController ,loginController ,testController} from '../controllers/authController.js'
import { isAdmin ,requireSignIn } from "../middlewears/authMiddleware.js";
import { forgotPasswordController } from "../controllers/authController.js";
//router object 
const router = express.Router()

//routing
//REGESTER || METHOD POST
router.post('/register' ,registerController);

//LOGIN || POST
router.post('/login' ,loginController);
//Forgot password
router.post("/forgot-password" ,forgotPasswordController)
//test routes
router.get('/test' ,requireSignIn ,isAdmin,testController);


// protected  admin route-auth
router.get("/admin-auth",requireSignIn, isAdmin ,(req, res) => {
    res.status(200).send({ ok: true});
})

export default router;