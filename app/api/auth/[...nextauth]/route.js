import { connectMongoDB } from "@/lib/mongodb";
import {User} from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.facebook_client_id,
      clientSecret: process.env.facebook_client_secret,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      async authorize(credentials, req) {
        const res = await fetch(process.env.URL +"/api/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        }) 
        const user = await res.json()
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  callbacks:{
    async signIn({user, account}){
        let { name, email } = user;
        if(account.provider == "google" || account.provider == "facebook"){
            try{
                await connectMongoDB();
                const userExists = await User.findOne({email});
                if(!userExists){
                    let res = await fetch( process.env.URL + "/api/user",{
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
