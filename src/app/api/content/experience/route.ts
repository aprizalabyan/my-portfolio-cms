import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const collection = db.collection("experience");

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const results = await collection.find({}).toArray();
    const trResults = results.map((item) => ({
      id: item._id,
      year: item.year,
      position: item.position,
      company: item.company,
      description: item.description,
      tags: item.tags,
      inputTag: item.inputTag,
    }));

    return NextResponse.json({
      message: "Success get experience",
      data: trResults,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();
    const allData = await collection.find({}).toArray();

    payload.forEach(async (item: any) => {
      if (item.id) {
        const found = await collection.findOne({
          _id: ObjectId.createFromHexString(item.id),
        });
        if (found) {
          await collection.updateOne(
            { _id: ObjectId.createFromHexString(item.id) },
            {
              $set: {
                year: item.year,
                position: item.position,
                company: item.company,
                description: item.description,
                tags: item.tags,
                inputTag: item.inputTag,
              },
            }
          );
        }
      } else {
        await collection.insertOne({
          year: item.year,
          position: item.position,
          company: item.company,
          description: item.description,
          tags: item.tags,
          inputTag: item.inputTag,
        });
      }
    });

    allData
      .filter(
        (item1: any) =>
          !payload.some((item2: any) => item1._id.toString() === item2.id)
      )
      .map((item: any) => item)
      .forEach(async (item: any) => {
        if (item._id) {
          await collection.deleteOne({
            _id: item._id,
          });
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
