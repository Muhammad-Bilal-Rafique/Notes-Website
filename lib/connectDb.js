import mongoose from "mongoose";

const connectDb = async()=>{
    if(mongoose.connection.readyState === 1)
        return mongoose.connection.asPromise()
    return mongoose.connect(process.env.Mongo_Url)
}
export default connectDb