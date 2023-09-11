import { NextResponse } from "next/server";

async function performLoginRequest(body: any) {
  try {
    const res = await fetch(`${process.env.API_URL}users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const resMessage = await res.json();
    if (res.ok) {
      return resMessage;
    } else {
      throw new Error(`Failed to register: ${resMessage}`);
    }
  } catch (error) {
    throw new Error(`Failed to connect to the server: ${error}`);
  }
}

export async function POST(request: Request) {
  const req = await request.text();

  try {
    const response = await performLoginRequest(req);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
