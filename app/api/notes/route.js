import connectDb from "@/lib/connectDb";
import Notes from "@/models/notes";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);

    const { title, longNote } = await req.json();
    // console.log(title , longNote);
    await Notes.create({ title, note: longNote, userId: session.user.id });
    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
}

export async function GET() {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    const notes = await Notes.find({ userId: session.user.id }).sort({
      _id: -1,
    });
    return Response.json({notes:notes});
} catch (error) {
    console.log(error);
    return Response.json({ success: false });
    
  }
}

export async function DELETE(req) {
    try {
        await connectDb()
        const {id} = await req.json()
        await Notes.findByIdAndDelete(id)
        return Response.json({success:true})
    } catch (error) {
        console.log(error);
        return Response.json({success:false})
    }
}

export async function PATCH(req){
    try {
        await connectDb()
        const {id , title , note } = await req.json()
        await Notes.findByIdAndUpdate(id , {title:title ,note:note})
        return Response.json({success:true})
        
        
    } catch (error) {
        console.log(error);
        return Response.json({success:false})
        
    }
}
