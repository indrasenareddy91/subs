export async function GET(request) {
  const filePath = `https://dl.subdl.com${req.query.url}`;

  request(filePath).pipe(res);
}
