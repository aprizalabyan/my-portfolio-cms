import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const collection = db.collection("users");
const jwt_secret = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();
    const user = await collection.findOne({ username: username });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { user_id: user._id, username: user.username },
      jwt_secret,
      { expiresIn: "24h" }
    );

    const response = NextResponse.json(
      {
        message: "Login success",
        data: { username: user.username, name: user.name, access_token: token },
      },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
