import mongoose from 'mongoose'

const mileageSchema = new mongoose.Schema({
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

export default mongoose.model("mileage" , mileageSchema);