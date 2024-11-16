// app/components/NavBar/NavBar.tsx

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./nav.scss";
import Hamburger from "hamburger-react";
import Image from "next/image";
import { motion } from "framer-motion";

const subLinkContainer = {
  hidden: {
    opacity: 0,
    backgroundSize: "100% 0%",
    backgroundRepeat: "no-repeat",
  },

  show: {
    opacity: 1,
    backgroundSize: "100% 100%",
    transition: { delayChildren: 0.25, staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    backgroundSize: "100% 0%",
    backgroundRepeat: "no-repeat",
  },
};

const navItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const imageWH = 80;
  useEffect(() => {
    switch (true) {
      case pathname.startsWith("/violin/"):
      case pathname.startsWith("/blog/"):
      case pathname === "/services":
        setBackgroundColor("#2e4057");
        break;
      case pathname === "/contact":
        setBackgroundColor("red");
        break;
      default:
        setBackgroundColor("transparent");
    }
  }, [pathname]);

  return (
    <div
      className={`z-10 flex items-center justify-between flex-wrap p-2 pl-8 sticky pb-3  ${pathname === "/" ? "drop-shadow" : ""}`}
      style={{ backgroundColor }}
    >
      <Link
        href={"/"}
        className="flex items-center flex-shrink-0 text-white mr-6 mt-2"
      >
        <Image
          priority={true}
          width={imageWH}
          height={imageWH}
          className={"Logo"}
          src={"/Logo.svg"}
          alt={"Logo"}
        />
        <div>
          <p className="font-serif text-lg tracking-tight w-20 h-14 -mt-6">
            Violin Guild of America
          </p>
        </div>
      </Link>
      <div className="block lg:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} color={"#FFFF"} />
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center  lg:w-auto ${isOpen ? "block" : "hidden"}`}
      >
        <div className="text-xl lg:flex-grow flex-nowrap font-bold">
          <Link
            href="/blog"
            className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mx-8"
          >
            Blog
          </Link>
          <div className=" inline-block w-fit mx-0">
            <div
              className={"flex flex-nowrap flex-row select-none cursor-pointer"}
              onClick={() => {
                if (isDropdownOpen) {
                  setTimeout(() => setDropdownOpen(false), 3000); // Delay closing
                } else {
                  setDropdownOpen(true); // Open immediately
                }
              }}
            >
              <h1 className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white ">
                Instruments
              </h1>
              <Image
                priority
                className={"ml-1 "}
                src={"/icons/chevron-down-outline.svg"}
                width={20}
                height={20}
                alt={"Down arrow"}
              />
            </div>
            {isDropdownOpen && (
              <motion.div
                variants={subLinkContainer}
                initial="hidden"
                className="absolute text-white rounded subLinkContainer shadow-lg pt-2 p-2"
                animate="show"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <motion.div className="block   w-fit " variants={navItem}>
                  <Link href="/instruments" className={"navSubLink "}>
                    Rare & Fine
                  </Link>
                </motion.div>
                <motion.div className="block   w-fit" variants={navItem}>
                  <Link href="/instruments/bows" className={"navSubLink"}>
                    Bows
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
          <Link
            href="/services"
            className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 mx-8"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="navLink block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 mx-8"
          >
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
