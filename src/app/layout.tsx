import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";


export const metadata: Metadata = {
  title: "Karthik's portfolio",
  description: "Professional portfolio of karthik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <div className="sticky top-0 z-50 opacity-90 bg-[#0a0a0a]" id="#top">
        <Navbar/>
        </div>
        {/* <hr className="w-full border-none drop-shadow-[0_0_8px_rgba(128,0,128,0.5)] h-[2px] bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900 "/> */}
        {children}
        
      </body>
    </html>
  );
}
