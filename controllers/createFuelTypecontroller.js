import slugify from "slugify";
import fuelTypeModel from "../models/fuelTypeModel.js";
export const createfuelTypeController = async( req,res) => {
    try{
          const {name} = req.body
          if(!name){
            return res.status(401).send( {message:'Name is recquired'})
          }
          const existingfuelType = await fuelTypeModel.findOne({name})
          if(existingfuelType)
          {
            return res.status(200).send({
                success:true,
                messsage:'fuelType already exists'
            })
          }
          const fuelType = await new fuelTypeModel({name , slug:slugify(name)}).save()
          res.status(201).send({
            success:true,
            message:'new fuelType created',
            fuelType
          })
    }
    catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error ',
        })
    }
};

//update category
export const updatefuelTypeController = async (req,res) => {
    try{
        const {name}= req.body
        const {id} = req.params
        const fuelType = await fuelTypeModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:'  updated successfully',
            fuelType
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating ',
    })
    }
}
// get all category
    export const fuelTypeController = async (req,res) => {
         try{
              const fuelType = await  fuelTypeModel.find({id:req.params.id});
              res.status(200).send({
                success:true,
                message:"All fuelTypes",
                fuelType

              });
         }catch(error){
            console.log(error);
            res.status(500).send({
                success:false,
                error,
                message:'Error while  getting ',
        })
         }
    }
    // get single category
    export const singlefuelTypeController = async (req,res) => {
        try{
            
                
                     const fuelType = await  fuelTypeModel.findOne({ slug:req.params.slug });
                     res.status(200).send({
                       success:true,
                       message:" Get single  successfully",
                       fuelType,
       
                     });
               

                    
        }catch(error){
           console.log(error);
           res.status(500).send({
               success:false,
               error,
               message:'Error while  getting  single ',
       })
        }
    }
    //delete category
    export const deletefuelTypeController = async (req,res) => {
        try{
            
            const {id} = req.params
           await fuelTypeModel.findByIdAndDelete(id);
            res.status(201).send({
                success:true,
                message:'  deleted successfully',
             
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error while deleting ',
                error
        })
        }
    }