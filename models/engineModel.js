import mongoose from 'mongoose'

const engineSchema = new mongoose.Schema({
    name:{
        type:String,
        recquired:true,
        unique:true,
    },
    slug: {
        type: String ,
        lowercase: true,
    },
});

export default mongoose.model("engine" , engineSchema);