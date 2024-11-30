"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./rare.scss";
import ProductCard from "@/app/components/productCard/productCard";
import { Instrument } from "@/app/interfaces/interfaces";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { Spinner } from "@nextui-org/spinner";
const data = await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/violins/page/route/top-three-expensive`,
);
const topThree = await data.json();
export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const violaRef = useRef<HTMLDivElement>(null);
  const isMediumScreen = useMediaQuery({ query: "(min-width: 932px)" });
  const [loading, setLoading] = useState(true);
  // Hook to get scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"], // Adjust offsets for desired effect
  });
  useEffect(() => {
    if (typeof topThree !== "undefined" && topThree.length > 0) {
      setLoading(false);
    }
  }, [data]);
  const { scrollYProgress: violaScrollYProgress } = useScroll({
    target: violaRef,
    offset: ["start center", "end end"],
  });
  // Transform scroll progress to horizontal translation
  const transX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const springX = useSpring(transX, {
    stiffness: 90,
    damping: 50,
    restDelta: 0.001,
  });
  const ViolaX = useTransform(violaScrollYProgress, [1, 0], [-200, 0]);
  const ViolaSpringX = useSpring(ViolaX, {
    stiffness: 90,
    damping: 50,
    restDelta: 0.001,
  });
  const violins = topThree.filter(
    (instrument: Instrument) => instrument.category === "violin",
  );
  const violas = topThree.filter(
    (instrument: Instrument) => instrument.category === "viola",
  );

  return (
    <div className="main min-h-screen overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="wrapper p-6 mt-52">
          <h1 className="rnf text-6xl">Rare & Fine</h1>

          <div
            className="violinContainer overflow-hidden mt-8 min-h-96"
            ref={scrollRef}
          >
            <h2 className=" font-medium secTitle text-gray-800">Violins:</h2>
            {topThree ? (
              <motion.div
                drag={!isMediumScreen}
                dragConstraints={{
                  top: 0,
                  right: 400,
                  bottom: 0,
                  left: -100,
                }}
                style={{
                  width: isMediumScreen ? "100%" : "150vw",
                  x: isMediumScreen ? 0 : springX,
                }}
                className="flex relative flex-row space-x-6 cursor-grab lg:cursor-auto lg:justify-between"
              >
                {violins.map((violin: Instrument) => (
                  <ProductCard
                    key={violin.id}
                    product={violin}
                    loaded={!loading}
                  />
                ))}
              </motion.div>
            ) : (
              <div
                className={
                  "w-full flex content-center items-center justify-center h-60"
                }
              >
                <Spinner color={"primary"} />
              </div>
            )}

            <Link
              href="/instruments/rare/violins"
              className="button-67 self-end ml-2 mb-2  pl-2"
            >
              <span>See More</span>
            </Link>
          </div>

          <div className="violinContainer mt-5" ref={violaRef}>
            <h2 className="text-4xl font-medium secTitle text-gray-800">
              Violas:
            </h2>
            {topThree ? (
              <motion.div
                drag={!isMediumScreen}
                dragConstraints={{
                  top: 0,
                  right: 400,
                  bottom: 0,
                  left: -0,
                }}
                style={{
                  width: isMediumScreen ? "100%" : "150vw",
                  x: isMediumScreen ? 0 : ViolaSpringX,
                }}
                className="flex relative flex-row space-x-6 slidingdiv cursor-grab lg:cursor-auto lg:justify-between"
              >
                {violas.map((viola: Instrument) => (
                  <ProductCard
                    key={viola.id}
                    product={viola}
                    loaded={!loading}
                  />
                ))}
              </motion.div>
            ) : (
              <div
                className={
                  "w-full flex content-center items-center justify-center h-60"
                }
              >
                <Spinner color={"primary"} />
              </div>
            )}

            <Link
              href="/instruments/rare/violas"
              className="button-67 self-end ml-2 mb-2  pl-2"
            >
              <span>See More</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
