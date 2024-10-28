// src/app/api/tracker/route.ts
import { sql } from "@vercel/postgres";
import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { lookup } from "ip-location-api/pack";

export async function POST(request) {
  return NextResponse.json({
    message: "success",
  });
}
