import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const collection = db.collection("contact");

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const results = await collection.find({}).toArray();
    const trResults = results.map((item) => ({
      id: item._id,
      category: item.category,
      data: item.data,
    }));

    return NextResponse.json({
      message: "Success get contact",
      data: trResults,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();

    payload.forEach(async (item: any) => {
      if (item.category == "email") {
        await collection.updateOne(
          { category: "email" },
          {
            $set: {
              data: item.data,
            },
          }
        );
      } else if (item.category == "socmed") {
        await collection.updateOne(
          { category: "socmed" },
          {
            $set: {
              data: item.data,
            },
          }
        );
      } else {
        return;
      }
    });

    return NextResponse.json({
      message: "Success update data",
      data: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
