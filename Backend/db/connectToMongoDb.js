import mongoose from 'mongoose';

const connectToMongoDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('Connected to MongoBD')
    } catch (error) {
        console.log('error connecting to the mongo db',error.message)
    }
}

export default connectToMongoDb;