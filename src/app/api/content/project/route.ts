import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

const collection = db.collection("project");

async function parseFormData(req: NextRequest) {
  const formData = await req.formData();
  const result: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    result[key] = value;
  }
  return result;
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const size = parseInt(searchParams.get("size") || "10");
    const skip = (page - 1) * size;

    const totalItems = await collection.countDocuments();
    const results = await collection.find({}).skip(skip).sort({ _id: -1 }).limit(size).toArray();
    const trResults = results.map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      year: item.year,
      tags: item.tags,
      url: item.url,
      image: item.image,
    }));

    return NextResponse.json({
      message: "Success get projects",
      data: {
        data: trResults,
        total_items: totalItems,
        total_pages: Math.ceil(totalItems / size),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const payload = await parseFormData(req);
    const { file, data } = payload;
    let imgUrl = "";

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const mimeType = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");

      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const uploadImg = await cloudinary.uploader.upload(fileUri, {
        folder: "portfolio-media",
      });

      imgUrl = uploadImg.secure_url;
    }

    const parsedData = JSON.parse(data);
    const insertData = { ...parsedData, image: imgUrl };
    await collection.insertOne(insertData);

    return NextResponse.json({
      message: "Success add data",
      data: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const payload = await parseFormData(req);
    const { file, data } = payload;
    let imgUrl = "";

    if (file) {
      const fileBuffer = await file.arrayBuffer();
      const mimeType = file.type;
      const encoding = "base64";
      const base64Data = Buffer.from(fileBuffer).toString("base64");

      const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
      const uploadImg = await cloudinary.uploader.upload(fileUri, {
        folder: "portfolio-media",
      });

      imgUrl = uploadImg.secure_url;
    }

    const parsedData = JSON.parse(data);
    const found = await collection.findOne({
      _id: ObjectId.createFromHexString(parsedData.id),
    });
    if (found) {
      if (file) {
        await collection.updateOne(
          { _id: ObjectId.createFromHexString(parsedData.id) },
          {
            $set: {
              title: parsedData.title,
              description: parsedData.description,
              year: parsedData.year,
              tags: parsedData.tags,
              url: parsedData.url,
              image: imgUrl,
            },
          }
        );
      } else {
        await collection.updateOne(
          { _id: ObjectId.createFromHexString(parsedData.id) },
          {
            $set: {
              title: parsedData.title,
              description: parsedData.description,
              year: parsedData.year,
              tags: parsedData.tags,
              url: parsedData.url,
            },
          }
        );
      }
    }

    return NextResponse.json({
      message: "Success update data",
      data: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
