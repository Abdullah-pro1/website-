import mongoose from "mongoose";
import { Monofett } from "next/font/google";

export const connectMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("CONNECTED SUCCESSFULLY")
    }
    catch(error){
        console.log("ERROR CONNECTING DB", error)
    }
}