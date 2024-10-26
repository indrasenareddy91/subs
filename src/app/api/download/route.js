export async function POST(request) {
  const filePath = `https://dl.subdl.com${req.query.url}`;

  request(filePath).pipe(res);
}
