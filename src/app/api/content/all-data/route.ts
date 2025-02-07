import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const [res_about, res_contact, res_experience, res_expertise, res_project] =
      await Promise.all([
        db.collection("about").find({}).toArray(),
        db.collection("contact").find({}).toArray(),
        db.collection("experience").find({}).toArray(),
        db.collection("expertise").find({}).toArray(),
        db.collection("project").find({}).sort({ _id: -1 }).limit(4).toArray(),
      ]);

    const tr_about = {
      header: res_about[0].header,
      subheader: res_about[0].subheader,
      description: res_about[0].description,
    };

    const tr_contact = res_contact.reduce((acc: any, item) => {
      acc[item.category] = item.data;
      return acc;
    }, {});

    const trResults = {
      about: tr_about,
      contact: tr_contact,
      experience: res_experience,
      expertise: res_expertise,
      project: res_project,
    };

    return NextResponse.json(
      {
        message: "Success get all data",
        data: trResults,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
