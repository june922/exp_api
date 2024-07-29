import mongoose from 'mongoose'

const ccSchema = new mongoose.Schema({
    name:{
        type: Number,
        recquired:true,
        unique:true,
    },
    slug: {
        type: Number ,
        lowercase: true,
    },
});

export default mongoose.model("cc" , ccSchema);