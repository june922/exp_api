import slugify from "slugify";
import mileageModel from "../models/mileageModel.js";
export const createMileageController = async( req,res) => {
    try{
          const {name} = req.body
          if(!name){
            return res.status(401).send( {message:'Name is recquired'})
          }
          const existingMileage = await mileageModel.findOne({name})
          if(existingMileage)
          {
            return res.status(200).send({
                success:true,
                messsage:'already exists'
            })
          }
          const mileage = await new mileageModel({name , slug:slugify(name)}).save()
          res.status(201).send({
            success:true,
            message:'new mileage created',
            mileage
          })
    }
    catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error in ',
        })
    }
};

//update category
export const updateMileageController = async (req,res) => {
    try{
        const {name}= req.body
        const {id} = req.param
        const mileage = await mileageModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:' updated successfully',
            mileage
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
    export const mileageController = async (req,res) => {
         try{
              const mileage = await  mileageModel.find({id:req.params.id});
              res.status(200).send({
                success:true,
                message:"All mileages",
                mileage

              });
         }catch(error){
            console.log(error);
            res.status(500).send({
                success:false,
                error,
                message:'Error while  getting category',
        })
         }
    }
    // get single category
    export const singleMileageController = async (req,res) => {
        try{
            
                
                     const mileage = await  mileageModel.findOne({ slug:req.params.slug });
                     res.status(200).send({
                       success:true,
                       message:" Get single  successfully",
                       mileage,
       
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
    export const deleteMileageController = async (req,res) => {
        try{
            
            const {id} = req.params
           await mileageModel.findByIdAndDelete(id);
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