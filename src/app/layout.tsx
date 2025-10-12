import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-afacad",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "QuangVu Store - Kính mắt cao cấp",
  description:
    "Cửa hàng kính mắt cao cấp với thiết kế hiện đại và chất lượng tốt nhất",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${afacad.variable} font-afacad antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
