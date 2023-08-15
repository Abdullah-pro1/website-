import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/user";

export async function POST(request) {
  if (request.method === "POST") {
    try {
      // Connect to MongoDB
      await connectMongoDB();

      const { name, email, password, phone } = await request.json();
      const userExists = await User.findOne({email});
      if (userExists) {
        return NextResponse.json({error: "Email already exists" }, {status:409});
      }
      else
        {    
            await User.create({name, email,password,phone});
            return NextResponse.json({message:"User Registered"}, {status:201});
        }
    } catch (error) {
      console.error("Error inserting data:", error);
      NextResponse.json({ error: "Unable to insert data" }, { status: 500 });
    }
  } else {
    NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
