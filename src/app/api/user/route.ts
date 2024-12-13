import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";

const collection = db.collection("users");

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const results = await collection.find({}).toArray();
    const trResults = results.map((item) => ({
      id: item._id,
      username: item.username,
      name: item.name,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }))

    return NextResponse.json({
      message: "Success get users",
      data: trResults,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
