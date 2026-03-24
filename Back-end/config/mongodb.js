import mongoose from "mongoose"

const connectToDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Database connected");
        
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/Task-Management-Start-Up`);

}

export default connectToDB;