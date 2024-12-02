// app/components/NavBar/NavBar.tsx

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./nav.scss";
import Hamburger from "hamburger-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

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
  const isMedScreen = useMediaQuery({ query: "(min-width: 766px)" });

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
      className={`z-10 relative w-screen transition flex items-center justify-between md:flex-nowrap flex-wrap`}
      style={{ backgroundColor }}
    >
      <div
        className={
          "p-2 pl-8 pb-3  flex items-center justify-between flex-wrap md:w-1/3 "
        }
      >
        <Link
          href={"/"}
          className="flex items-center flex-shrink-0 text-white mr-6 mt-2 "
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
        <div
          className={`block md:hidden right-14 fixed ${isOpen ? " z-50" : ""}`}
        >
          <Hamburger
            toggled={isOpen}
            onToggle={() => setDropdownOpen(!isDropdownOpen)}
            toggle={setOpen}
            color={"#FFFF"}
          />
        </div>
      </div>
      <motion.div
        initial={{ x: 1000, opacity: 0 }}
        animate={{
          x: isOpen || isMedScreen ? 0 : 1000, // No translation on md+
          opacity: isOpen || isMedScreen ? 1 : 0,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: isMedScreen ? 0 : 0.9 }}
        style={{ overflow: "hidden" }}
        className={`w-full flex-grow lg:flex top-0 md:translate-x-0 md:row lg:items-center md:height-auto fixed md:static lg:w-auto z-40 ${
          isOpen ? "open" : "closed"
        }`}
      >
        <div className="text-xl md:flex-grow lg:w-full flex-nowrap font-bold flex-col md:flex-row h-full md:h-auto  lg:justify-around md:flex md:items-center md:align-middle pt-10 md:pt-0">
          <Link
            rel="preload"
            onClick={() => setOpen(!isOpen)}
            href="/blog"
            className="navLink overflow-visible block mt-4  md:mx-2  md:inline-block  text-white hover:text-white"
          >
            Blog
          </Link>
          <div className="inline-block md:mx-2 mt-4 ">
            <div
              className={
                "flex flex-nowrap flex-row select-none cursor-pointer align-middle items-center"
              }
              onClick={() => {
                if (isDropdownOpen) {
                  setTimeout(() => setDropdownOpen(false), 3000); // Delay closing
                } else {
                  setDropdownOpen(true); // Open immediately
                }
              }}
            >
              <h1 className="navLink w-fit overflow-visible block md:inline-block lg:mt-0 text-white hover:text-white ">
                Instruments
              </h1>
              <Image
                priority
                className={"ml-1 h-8 w-8 md:h-6 md:mr-5"}
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
                className=" md:absolute block text-white rounded subLinkContainer md:shadow-lg pt-2 p-2"
                animate="show"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="block   w-fit "
                  onClick={() => {
                    setDropdownOpen(false);
                    setOpen(!isOpen);
                  }}
                  variants={navItem}
                >
                  <Link
                    rel="preload"
                    as="/instruments"
                    href="/instruments"
                    className={"navSubLink "}
                  >
                    Rare
                  </Link>
                </motion.div>
                <motion.div
                  className="block  md:inline-block   w-fit"
                  onClick={() => {
                    setDropdownOpen(false);
                    setOpen(!isOpen);
                  }}
                  variants={navItem}
                >
                  <Link
                    href="/instruments/bows"
                    rel="preload"
                    as="/instruments/bows"
                    className={"navSubLink "}
                  >
                    Bows
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
          <Link
            onClick={() => setOpen(!isOpen)}
            href="/services"
            className="navLink w-1/4 overflow-visible md:inline-block block mt-4 lg:inline-block  text-white hover:text-white  md:mx-2"
          >
            Services
          </Link>
          <Link
            onClick={() => setOpen(!isOpen)}
            href="/about"
            className="navLink w-1/4 overflow-visible md:inline-block block mt-4 text-white hover:text-white md:mx-2"
          >
            About
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
