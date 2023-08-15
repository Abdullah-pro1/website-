import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {Task} from "@/models/user";

export async function POST(request) {
    try {
      // Connect to MongoDB
     await connectMongoDB();

      const {email,password} = await request.json();
      const data = await Task.find({email});
      if (data) {
         return NextResponse.json(data, {status:200});
      }
      else
        {    
            return NextResponse.json({message:"Task not found"}, {status:400});
        }
    } catch (error) {
      NextResponse.json({error: "Unable to get data data" }, {status:500});
    }
  }