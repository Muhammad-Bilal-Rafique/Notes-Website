import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
    title:{type:String , required:true},
    note:{type:String , required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
})

export default mongoose.models.Notes || mongoose.model("Notes" , notesSchema)