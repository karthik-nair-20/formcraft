// Input: { name: string, email: string, password: string }
// Success 200: { user: { id, name, email } } + session cookie
// Failure 401: { error: "Invalid credentials" }
import { connectToDb } from "@/config/database";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDb();
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 401 });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    // add a verify mail feature later
    return NextResponse.json({ message: "User created successfully", success:  true }, { status: 201 });

  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({ message: "Internal Server Error", success: false, error }, { status: 500 });
  }
}