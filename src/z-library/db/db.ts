import mongoose from "mongoose"

export const connectDB = async(mongodbUri: string) =>{
    await mongoose.connect(mongodbUri)
    console.log('Connected to users db')
}