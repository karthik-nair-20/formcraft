// Input: { email: string, password: string, rememberMe?: boolean }
// Success 200: { user: { id, name, email } } + session cookie
// Failure 401: { error: "Invalid credentials" }
import { connectToDb } from "@/config/database";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectToDb();
  try {
    const reqBody = await request.json();
    const { email, password, rememberMe } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid User credentials" }, { status: 401 });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password credentials" }, { status: 401 });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: rememberMe ? "7d" : "1d" });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}