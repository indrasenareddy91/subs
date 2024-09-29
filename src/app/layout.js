import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SUBS",
  description: "Download subtitles for any movie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollbarWidth: "none" }}>
      <body
        style={{
          margin: "0px",
          padding: "0px",
          height: "100%",
          scrollbarWidth: "none",
        }}
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
