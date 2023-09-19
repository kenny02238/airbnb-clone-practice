import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}listings/`);
    return NextResponse.json(response, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function POST(req: any) {
  const token = await getToken({ req, secret });
  const body = await req.formData();

  try {
    const response = await fetch(`${process.env.API_URL}listings/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
