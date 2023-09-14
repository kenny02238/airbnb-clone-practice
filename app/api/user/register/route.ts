import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  try {
    const response = await fetch(`${process.env.API_URL}users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
