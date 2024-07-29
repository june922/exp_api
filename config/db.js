import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {

      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
     
     
    });
    console.log(`Connected to MongoDB ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
    // Optionally, you can add retry logic here
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

export default connectDB;
