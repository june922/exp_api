import slugify from "slugify";
import makeModel from "../models/makeModel.js";
export const createMakeController = async( req,res) => {
    try{
          const {name} = req.body
          if(!name){
            return res.status(401).send( {message:'Name is recquired'})
          }
          const existingMake = await makeModel.findOne({name})
          if(existingMake)
          {
            return res.status(200).send({
                success:true,
                messsage:'category already exists'
            })
          }
          const make = await new makeModel({name , slug:slugify(name)}).save()
          res.status(201).send({
            success:true,
            message:'new make created',
            make
          })
    }
    catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'error in category',
        })
    }
};

//update category
export const updateMakeController = async (req,res) => {
    try{
        const {name}= req.body
        const {id} = req.param
        const make = await makeModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:' make updated successfully',
            make
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while updating make',
    })
    }
}
// get all category
    export const makeController = async (req,res) => {
         try{
              const make = await  makeModel.find({id:req.params.id});
              res.status(200).send({
                success:true,
                message:"All makes",
                make

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
    export const singleMakeController = async (req,res) => {
        try{
            
                
                     const make = await  makeModel.findOne({ slug:req.params.slug });
                     res.status(200).send({
                       success:true,
                       message:" Get single make successfully",
                       make,
       
                     });
               

                    
        }catch(error){
           console.log(error);
           res.status(500).send({
               success:false,
               error,
               message:'Error while  getting  single make',
       })
        }
    }
    //delete category
    export const deleteMakeController = async (req,res) => {
        try{
            
            const {id} = req.params
           await makeModel.findByIdAndDelete(id);
            res.status(201).send({
                success:true,
                message:' make deleted successfully',
             
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error while deleting category',
                error
        })
        }
    }