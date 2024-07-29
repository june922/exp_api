import slugify from "slugify";
import transmissionModel from "../models/transmissionModel.js";
export const createTransmissionController = async( req,res) => {
    try{
          const {name} = req.body
          if(!name){
            return res.status(401).send( {message:'Name is recquired'})
          }
          const existingTransmission = await transmissionModel.findOne({name})
          if(existingTransmission)
          {
            return res.status(200).send({
                success:true,
                messsage:' already exists'     
            })
          }
          const transmission = await new transmissionModel({name , slug:slugify(name)}).save()
          res.status(201).send({
            success:true,
            message:'new transmission created',
            transmission
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
export const updateTransmissionController = async (req,res) => {
    try{
        const {name}= req.body
        const {id} = req.param
        const transmission = await transmissionModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:'  updated successfully',
            transmission
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
    export const transmissionController = async (req,res) => {
         try{
              const transmission = await  transmissionModel.find({id:req.params.id});
              res.status(200).send({
                success:true,
                message:"All transmission",
                transmission

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
    export const singleTransmissionController = async (req,res) => {
        try{
            
                
                     const transmission = await  transmissionModel.findOne({ slug:req.params.slug });
                     res.status(200).send({
                       success:true,
                       message:" Get single transmission successfully",
                       transmission,
       
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
    export const deleteTransmissionController = async (req,res) => {
        try{
            
            const {id} = req.params
           await transmissionModel.findByIdAndDelete(id);
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