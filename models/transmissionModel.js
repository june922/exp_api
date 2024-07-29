import mongoose from 'mongoose'

const transmissionSchema = new mongoose.Schema({
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

export default mongoose.model("transmission" , transmissionSchema);