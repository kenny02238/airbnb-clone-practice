import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
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

export async function DELETE(req: any) {
  const token = await getToken({ req, secret });
  const request = await req.json();

  try {
    const response = await fetch(
      `${process.env.API_URL}reservations/${request.id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
