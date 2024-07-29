import slugify from "slugify";
import engineModel from "../models/engineModel.js";
export const createEngineController = async( req,res) => {
    try{
          const {name} = req.body
          if(!name){
            return res.status(401).send( {message:'Name is recquired'})
          }
          const existingEngine = await engineModel.findOne({name})
          if(existingEngine)
          {
            return res.status(200).send({
                success:true,
                messsage:'category already exists'
            })
          }
          const engine = await new engineModel({name , slug:slugify(name)}).save()
          res.status(201).send({
            success:true,
            message:'new engine created',
            engine
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
export const updateEngineController = async (req,res) => {
    try{
        const {name}= req.body
        const {id} = req.param
        const engine = await engineModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(201).send({
            success:true,
            message:'  updated successfully',
            engine
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
    export const engineController = async (req,res) => {
         try{
              const engine = await  engineModel.find({id:req.params.id});
              res.status(200).send({
                success:true,
                message:"All engines",
                engine

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
    export const singleEngineController = async (req,res) => {
        try{
            
                
                     const engine = await  engineModel.findOne({ slug:req.params.slug });
                     res.status(200).send({
                       success:true,
                       message:" Get single make successfully",
                       engine,
       
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
    export const deleteEngineController = async (req,res) => {
        try{
            
            const {id} = req.params
           await engineModel.findByIdAndDelete(id);
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