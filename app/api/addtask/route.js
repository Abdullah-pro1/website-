import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {Task} from "@/models/user";

export async function POST(request) {
  if (request.method === "POST") {
    try {
      // Connect to MongoDB
     await connectMongoDB();
      const {email,title,priority,tag,time} = await request.json();
            await Task.create({email,title,priority,tag,time});
            return NextResponse.json({message:"Task Registered"}, {status:201});
    } catch (error) {
      console.error("Error inserting data:", error);
      NextResponse.json({error: "Unable to insert Task" }, {status:500});
    }
  } else {
    NextResponse.json({error: "Method not allowed" }, {status:405});
  }
}
