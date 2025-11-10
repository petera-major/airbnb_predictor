import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://suspicious-daune-juandavidacevedon-42795941.koyeb.app/insights"
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching insights:", error);
    return NextResponse.json(
      { error: "Failed to load market insights" },
      { status: 500 }
    );
  }
}
