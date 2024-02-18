import 'dotenv/config'
import { connectDB } from '@/z-library/db/db';

const mongodbUri = process.env.MONGODB_URI

if(mongodbUri){
   (async() =>{
        try {
            await connectDB(mongodbUri)
        } catch (error) {
            console.log('DB connection failed')
        }
    }
   )()
} else{
    console.log('Mongo Db connection string not found')
}

