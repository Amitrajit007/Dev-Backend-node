import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
      // this 2 are used to be important but in v6+ this are default configs.
    });
  } catch (error) {
    console.log(
      "Error while connecting to data base : " + error.message || error
    );
  }
};

export default connectDB;
