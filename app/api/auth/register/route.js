import connectDb from "@/lib/connectDb"
import User from "@/models/user"
import bcrypt from "bcrypt"

export async function POST(req) {
    try {
        await connectDb()
        const {name , gmail , password} = await req.json()
        console.log("Recieving :" , name , gmail , password);
        const user = await User.findOne({gmail})
        if(user) return Response.json({alreadyExists:true})
        const hashedPassword =await bcrypt.hash(password,10)
        await User.create({name , gmail , password:hashedPassword})
        return Response.json({success:true})
        
    } catch (error) {
        console.log(error);
        return Response.json({success:false})
    }
}