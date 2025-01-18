import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

const collection = db.collection("project");

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    const results = await collection.deleteOne({
      _id: ObjectId.createFromHexString(params.id),
    });

    if (results.deletedCount === 0) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Success delete data",
      data: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
