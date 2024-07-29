import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    
    model: {           
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Assuming price cannot be negative
    },
    cc: {
        type: Number,
        required: true
      },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    color: {
        type: String,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
       
      },
    fuelType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: [{
        data: Buffer,
        contentType: String
    }]
}, {
    timestamps: true
});





export default mongoose.model('Car', carSchema);
