import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://algograss.com"),
  title: {
    default: "AlgoGrass",
    template: "%s | AlgoGrass",
  },
  description: "알고리즘 핵심 코드를 매일 작성하고 잔디를 심어보세요.",
  openGraph: {
    title: "AlgoGrass",
    description: "알고리즘 핵심 코드를 매일 작성하고 잔디를 심어보세요.",
    url: "https://algograss.com",
    siteName: "AlgoGrass",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
