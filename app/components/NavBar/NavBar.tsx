// app/components/NavBar/NavBar.tsx

"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import "./nav.scss";
import Hamburger from 'hamburger-react';
import Image from "next/image";

const NavBar = () => {
    const [isOpen, setOpen] = useState(false);
    const pathname = usePathname();
    const [backgroundColor, setBackgroundColor] = useState('transparent');
    const imageWH = 80;
    useEffect(() => {
        switch (true) {
            case pathname.startsWith('/violin/'):
            case pathname.startsWith('/blog/'):
            case pathname === '/services':
                setBackgroundColor('#2e4057');
                break;
            case pathname === '/contact':
                setBackgroundColor('red');
                break;
            default:
                setBackgroundColor('transparent');
        }
    }, [pathname]);

    return (
        <div className={`z-10 flex items-center justify-between flex-wrap p-2 pl-8 sticky pb-3 ${pathname === '/' ? 'drop-shadow' : ''}`} style={{ backgroundColor }}>
            <div className="flex items-center flex-shrink-0 text-white mr-6 mt-2">
                <Image priority={true} width={imageWH} height={imageWH} className={"Logo"} src={"/Logo.svg"} alt={"Logo"}/>
                <div>
                    <p className="font-serif text-lg tracking-tight w-20 h-14 -mt-6">Violin Guild of America</p>
                </div>
            </div>
            <div className="block lg:hidden">
                <Hamburger toggled={isOpen} toggle={setOpen} color={"#FFFF"} />
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
                <div className="text-xl lg:flex-grow font-bold">
                    <Link href="/" className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 mx-8">
                        Home
                    </Link>
                    <Link href="/blog" className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mx-8">
                        Blog
                    </Link>
                    <Link href="/products" className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 mx-8">
                        Products
                    </Link>
                    <Link href="/services" className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 mx-8">
                        Services
                    </Link>
                    <Link href="/about" className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 mx-8">
                        About
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;