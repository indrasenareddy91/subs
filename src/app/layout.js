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
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-X95MLJGX3W"
      ></script>
      <script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-X95MLJGX3W');
      </script>
      <body
        style={{
          margin: "0px",
          padding: "0px",
          width: " 100%",
          height: "100dvh",
          scrollbarWidth: "none",
        }}
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
