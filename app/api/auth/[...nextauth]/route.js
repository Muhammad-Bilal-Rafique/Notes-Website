import connectDb from "@/lib/connectDb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        gmail: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
        const user = await User.findOne({ gmail: credentials.gmail });
        if (!user) throw new Error("Gmail does not exist.");
        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
          user.password
        );
        if(!isPasswordCorrect) throw new Error("Incorrect password.")
        return {
            name:user.name,
            id:user._id
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token , user}){
      if(user){
        token.id = user.id,
        token.name = user.name
      }
      return token
    },
    async session({session , token}){
      session.user.id = token.id
      session.user.name = token.name
      return session
    }
  },
  session:{
    strategy:"jwt"
  },
  
};

const handler = NextAuth(authOptions)
export { handler as GET , handler as POST}
