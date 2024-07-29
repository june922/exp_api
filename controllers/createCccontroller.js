import slugify from "slugify";
import ccModel from "../models/ccModel.js";
export const createCcController = async( req,res) => {
    try{
          const {name} = req.body
          if(!name){
            return res.status(401).send( {message:'Name is recquired'})
          }
          const existingCc = await ccModel.findOne({name})
          if(existingCc)
          {
            return res.status(200).send({
                success:true,
                messsage:'category already exists'
            })
          }
          const cc = await new ccModel({name , slug:slugify(name)}).save()
          res.status(201).send({
            success:true,
            message:'new cc created',
            cc
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
export const updateCcController = async (req,res) => {
    try{
        const {name}= req.body
        const {id} = req.param
        const cc = await ccModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:'  updated successfully',
            cc
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
    export const ccController = async (req,res) => {
         try{
              const cc = await  ccModel.find({id:req.params.id});
              res.status(200).send({
                success:true,
                message:"All makes",
                cc

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
    export const singleCcController = async (req,res) => {
        try{
            
                
                     const cc = await  ccModel.findOne({ slug:req.params.slug });
                     res.status(200).send({
                       success:true,
                       message:" Get single  successfully",
                       cc,
       
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
    export const deleteCcController = async (req,res) => {
        try{
            
            const {id} = req.params
           await ccModel.findByIdAndDelete(id);
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