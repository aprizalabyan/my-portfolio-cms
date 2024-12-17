import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const collection = db.collection("about");

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const results = await collection.find({}).toArray();
    const trResults = results.map((item) => ({
      id: item._id,
      header: item.header,
      subheader: item.subheader,
      description: item.description,
    }));

    return NextResponse.json({
      message: "Success get about",
      data: trResults,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { id, header, subheader, description } = await req.json();
    const results = await collection.updateOne(
      {"_id": ObjectId.createFromHexString(id)},
      {"$set": {
        "header": header,
        "subheader": subheader,
        "description": description,
      }}
    );

    return NextResponse.json({
      message: "Success update data",
      data: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
