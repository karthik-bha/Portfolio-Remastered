import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Inter, Montserrat } from 'next/font/google'


export const metadata: Metadata = {
  metadataBase: new URL("https://karthikbuilds.in"),
  title: "Karthik Bhat | Full Stack Developer Portfolio",
  description:
    "Portfolio of Karthik Bhat — Full Stack Developer specializing in React, Next.js, and Spring Boot. View projects, experience, and contact details.",
  keywords: [
    "Karthik Bhat",
    "Full Stack Developer",
    "React Developer",
    "Next.js Portfolio",
    "Spring Boot Developer",
    "Web Developer India",
  ],
  openGraph: {
    title: "Karthik Bhat | Full Stack Developer",
    description:
      "Explore my portfolio of modern web applications built with React, Next.js, and Spring Boot.",
    url: "https://karthikbuilds.in",
    siteName: "Karthik Bhat Portfolio",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Karthik Bhat Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthik Bhat | Full Stack Developer",
    description:
      "Modern web applications built with React, Next.js & Spring Boot.",
    images: ["/banner.jpg"],
  },
};



const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>

        <div className="sticky top-0 z-50 opacity-90 bg-[#0a0a0a]" id="#top">
          <Navbar />
        </div>
        {/* <hr className="w-full border-none drop-shadow-[0_0_8px_rgba(128,0,128,0.5)] h-[2px] bg-gradient-to-r from-purple-400 via-purple-600 to-purple-900 "/> */}
        {children}

      </body>
    </html>
  );
}
