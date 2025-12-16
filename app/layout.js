// app/layout.js (server component)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientSessionProvider from "./ClientSessionProvider"; // client wrapper

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Notes Website",
  description: "A full-stack Notes application built with Next.js and MongoDB",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
