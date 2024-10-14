import { sql } from "@vercel/postgres";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

async function getRecentDownloads() {
  const { rows } = await sql`
    SELECT DISTINCT ON (movie_name) id, movie_name, country
    FROM movies
    ORDER BY movie_name, id DESC
    LIMIT 5
  `;

  return rows;
}

export default async function RecentDownloads() {
  const downloads = await getRecentDownloads();

  return (
    <div className="fixed bottom-4 right-4 w-64 hidden lg:block">
      <Card>
        <CardHeader>
          <CardTitle>Recent Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {downloads.map((download) => {
              const [title, year] = download.movie_name.split(",");
              return (
                <div key={download.id} className="mb-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500">
                    {year} - {download.country}
                  </p>
                </div>
              );
            })}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
