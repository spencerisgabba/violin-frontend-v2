import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.scss";
import NavBar from "@/app/components/NavBar/NavBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/app/components/footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Violin Guild of America",
  description:
    "The VGA Academy for Refurbishment was founded in 2011 by master violin maker, William Bartruff of Minneapolis Minnesota. William's goal in founding the guild was to pass on his knowledge to a new generation of luthiers and preserve the tradition of violin makers. The results have been notable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"bg-dablue"}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBar />
        {children}
        <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}`} />
        <Footer />
      </body>
    </html>
  );
}
