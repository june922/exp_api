import mongoose from 'mongoose'

const modelSchema = new mongoose.Schema({
    name:{
        type:String,
        recquired:true,
        unique:true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
});

export default mongoose.model("model" , modelSchema);