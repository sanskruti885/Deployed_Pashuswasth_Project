import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MOONGODB_URI);
        console.log('MongoDB connected successfully'); // <-- important log
      } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
      }
}

export default connectDB
