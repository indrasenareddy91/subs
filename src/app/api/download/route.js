export async function GET(req, res) {
  const filePath = `https://dl.subdl.com${req.query.url}`;

  request(filePath).pipe(res);
}
