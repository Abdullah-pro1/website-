import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/user";

export async function POST(request) {
    try {
      // Connect to MongoDB
     await connectMongoDB();

      const {email,password} = await request.json();
      const userExists = await User.findOne({email,password});
      if (userExists) {
        return NextResponse.json( userExists, {status:201});
      }
      else
        {    
            return NextResponse.json({message:"User not found"}, {status:400});
        }
    } catch (error) {
      console.error("Error inserting data:", error);
      NextResponse.json({error: "Unable to insert data" }, {status:500});
    }
  }