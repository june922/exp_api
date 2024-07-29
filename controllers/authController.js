import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
    try {
        const { name, email, password,answer } = req.body;

        // Validations
        if (!name) {
            return res.status(400).send({ message : 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({  message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Password is required' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' });
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered, please login',
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create and save new user
        const user = new userModel({ name, email, password: hashedPassword,answer });
        await user.save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.error('Error in Registration:', error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error,
        });
    }
};

//POST LOGIN
export const loginController = async (req,res) => {
    try{
        const {email,password} =req.body
        //validation
        if(!email || !password){
            res.status(404).send({
                success:false,
                message:'invalid email or password'
            })
        }
        //checkuser 
        const user = await userModel.findOne({email})
        if(!user){
            res.status(404).send({
                success:false,
                message:'Email not registered'
            })}
        const match = await comparePassword(password,user.password)
        if(!match){
            res.status(404).send({
                success:false,
                message:'Invalid password'
            })}   
            //token
            const token = await JWT.sign({_id: user._id},process.env.JWT_SECRET,{
                expiresIn:"7d",
            });
            res.status(200).send({
                success:true,
                message:'login succesfully',
                user:{
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },
                token,
            })}
    
    catch (error)
        {
         console.log(error)
         res.status(500).send({
            success: false,
            message: 'Error in login'
                                               
        });
        }
    
};
//forgotPasswordController

export const forgotPasswordController = async (req,res) =>{
try{
 const{ email,answer,newPassword} = req.body
 if(!email){
    res.status(400).send({message:'Email is recquired'})
 }
 if(!answer){
    res.status(400).send({message: 'Answer is recquired'})
 }
 if(!newPassword){
    res.status(400).send({message:'New Password is recquired'})
 }
 //check
 const user = await userModel.findOne({email,answer})
 //validation
 if (!user){
    return res.status(404).send({
        success:false,
        message:'Wrong Email or Answer'
    })
 }
 const hashed = await hashPassword(newPassword)
 await userModel.findByIdAndUpdate(user._id, {password: hashed});
 res.status(200).send({
    sucess: true,
    message: "password Reset Successfully",
 })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'something went wrong',
        error
    })
}
}


//test controller
export const testController =(req,res) =>{
    try{
    res.send('protected Routes');
    } catch (error) {
        console.log(error);
        res.send(error)
    }
};
