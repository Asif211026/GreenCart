import mongoose from "mongoose";
 
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(`${process.env.mongo_URI}/GreenCart`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("Database Connection Error:", error.message);
    }
};
export default connectDB;

