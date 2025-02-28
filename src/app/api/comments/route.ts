// eslint-disable-next-line @typescript-eslint/no-unused-vars
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import Comment from "@/models/Comment";

export async function GET() {
  await connectDB();
  const comments = await Comment.find();
  return NextResponse.json(comments);
}




export async function POST(req: Request) {
  const { name, message } = await req.json();
  if (!message.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });

  await connectDB();
  const newComment = await Comment.create({ name, message });
  return NextResponse.json(newComment, { status: 201 });
}
