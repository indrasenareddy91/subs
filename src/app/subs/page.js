"use client";
import { Suspense } from "react";
import "../index.css";
import "./page.css";
import SubtitlesContent from "./subs";
export default function SubtitlesPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90svh",
          }}
        >
          <div
            className="quote-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="spinner"></div>
          </div>
        </div>
      }
    >
      <SubtitlesContent />
    </Suspense>
  );
}
