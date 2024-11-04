import type { Metadata } from "next";
import "../global.scss";
export const metadata: Metadata = {
    title: "Blog",
    description: "The Blog for the VGA Academy for Refurbishment was founded in 2011 by master violin maker, William Bartruff of Minneapolis Minnesota. William's goal in founding the guild was to pass on his knowledge to a new generation of luthiers and preserve the tradition of violin makers. The results have been notable.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        {children}
        </>
    );
}
