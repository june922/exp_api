import slugify from "slugify";
import modelModel from "../models/modelModel.js";
export const createModelController = async( req,res) => {
    try{
          const {name} = req.body
          if(!name){
            return res.status(401).send( {message:'Name is recquired'})
          }
          const existingModel = await modelModel.findOne({name})
          if(existingModel)
          {
            return res.status(200).send({
                success:true,
                messsage:'model already exists'
            })
          }
          const model = await new modelModel({name , slug:slugify(name)}).save()
          res.status(201).send({
            success:true,
            message:'new model created',
            model
          })
    }
    catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error in model',
        })
    }
};

//update category
export const updateModelController = async (req,res) => {
    try{
        const {name}= req.body
        const {id} = req.param
        const model = await modelModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:' model updated successfully',
            model
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating model',
    })
    }
}
// get all category
    export const modelController = async (req,res) => {
         try{
              const model = await  modelModel.find({id:req.params.id});
              res.status(200).send({
                success:true,
                message:"All models",
                model

              });
         }catch(error){
            console.log(error);
            res.status(500).send({
                success:false,
                error,
                message:'Error while  getting model',
        })
         }
    }
    // get single category
    export const singleModelController = async (req,res) => {
        try{
            
                
                     const model = await  modelModel.findOne({ slug:req.params.slug });
                     res.status(200).send({
                       success:true,
                       message:" Get single model successfully",
                       model,
       
                     });
               

                    
        }catch(error){
           console.log(error);
           res.status(500).send({
               success:false,
               error,
               message:'Error while  getting  single model',
       })
        }
    }
    //delete category
    export const deleteModelController = async (req,res) => {
        try{
            
            const {id} = req.params
           await modelModel.findByIdAndDelete(id);
            res.status(201).send({
                success:true,
                message:' model deleted successfully',
             
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error while deleting model',
                error
        })
        }
    }