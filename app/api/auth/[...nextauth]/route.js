import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async signIn({user, account}){
       
        let { name, email } = user;
        if(account.provider == "google"){
            try{
                await connectMongoDB();
                const userExists = await User.findOne({email});
                if(!userExists){
                    let res = await fetch(process.env.URL+ "/api/user",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                        },
                        body:JSON.stringify({name, email})
                    })
                    if(res.ok){
                        return user;
                    }
                }
            }catch(error){
                console.log("ERROR SAVING DATA TO MONGO", error)
            }
        }
        return user;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };