const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // MongoDB connection URI from environment variable
    const uri = "mongodb://localhost:27017/mydb";

    // Connect to MongoDB
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
