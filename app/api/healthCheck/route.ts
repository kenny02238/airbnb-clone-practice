import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("check!", { status: 200 });
}
