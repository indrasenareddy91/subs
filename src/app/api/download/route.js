import { Readable } from "stream";

export async function GET(request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("URL parameter is required", { status: 400 });
  }

  const filePath = `https://dl.subdl.com${url}`;

  try {
    const response = await fetch(filePath);

    // Simply return the response with proper headers
    return new Response(response.body, {
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/octet-stream",
        "Content-Disposition": "attachment",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new Response("Error downloading file", { status: 500 });
  }
}
