import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request) {
  return NextResponse.json({
    message: "shsh",
  });
}
