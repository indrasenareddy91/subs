// page.js
import { Suspense } from "react";
import SearchContainer from "./SearchContainer";
import { SubtitleContent } from "./SubtitleContent";
import QuoteLoader from "./QuoteLoader";

export default function Page({ searchParams }) {
  const q = searchParams?.q;

  return (
    <div className="hide-scrollbar">
      {q ? (
        <>
          <SearchContainer />
          <Suspense fallback={<QuoteLoader />}>
            <SubtitleContent movieId={q} />
          </Suspense>
        </>
      ) : (
        <QuoteLoader />
      )}
    </div>
  );
}
