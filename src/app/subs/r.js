// page.js
import { Suspense } from "react";
import SearchContainer from "./SearchContainer";
import { SubtitleContent } from "./SubtitleContent";
import Q from "./Q";
export default async function Page({ searchParams }) {
  const q = searchParams?.q;

  return (
    <div className="hide-scrollbar">
      {q ? (
        <>
          <Suspense fallback={<Q />}>
            <SubtitleContent movieId={q} />
          </Suspense>
        </>
      ) : (
        <Q />
      )}
    </div>
  );
}
