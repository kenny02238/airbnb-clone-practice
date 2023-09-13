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
    console.log("response", response);

    return NextResponse.json(response, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
