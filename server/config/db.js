import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Warning: MongoDB connection failed: ${error.message}`);
    console.warn('Server will run in demo mode without database persistence');
  }
};

export default connectDB;
