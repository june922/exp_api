import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    answer: {
        type: String,
        recquired: true
    },
    role: {type:Number,default:0}
    // other fields as needed
});

const User = mongoose.model('User', userSchema);

export default User;
