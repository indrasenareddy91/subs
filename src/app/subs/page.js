"use client";
import { Suspense } from "react";
import SubtitlesContent from "./SubtitlesContent";
import "../index.css";
import "./page.css";

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
