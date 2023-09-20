import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: any) {
  const token = await getToken({ req });
  const body = await req.json();

  try {
    const response = await fetch(`${process.env.API_URL}reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(body),
    });
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
