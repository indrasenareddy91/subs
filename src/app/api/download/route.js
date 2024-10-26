import { Readable } from "stream";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("URL parameter is required", { status: 400 });
  }

  const filePath = `https://dl.subdl.com${url}`;

  try {
    const response = await fetch(filePath);
    const stream = Readable.fromWeb(response.body);

    // Create Headers object with the same headers
    const headers = new Headers({
      "Content-Type":
        response.headers.get("Content-Type") || "application/octet-stream",
      "Content-Disposition": "attachment",
    });

    // Use stream.pipe() concept through Web Streams
    const { readable, writable } = new TransformStream();
    stream.pipe(Readable.toWeb(writable));

    return new Response(readable, { headers });
  } catch (error) {
    console.error("Download error:", error);
    return new Response("Error downloading file", { status: 500 });
  }
}
