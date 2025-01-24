import mongoose from "mongoose";

const connectDB = async () => {
    try{
    const uri = 'mongodb://localhost:27017/taskManagement' 
    await mongoose.connect(uri)
    console.log('connected to db');
    
}
    catch(e) {
        console.log(e);
        
    }
}
export default connectDB