"use client";

import "./home.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { VideoBG } from "./components/VideoBG/VideoBG";
import { useMediaQuery } from "react-responsive";

import Bulletin from "@/app/components/Bulletin/Bulletin";

import ImageSlider from "@/app/components/imageslider/ImageSlider";
export default function Page() {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 926px)" });

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const animateText = () => {
      if (titleRef.current) {
        // Fade out the current text
        gsap.to(titleRef.current, {
          opacity: 0,
          duration: 1,
          y: -50,
          ease: "power3.in",
          onComplete: () => {
            // Change the text content
            if (titleRef.current) {
              const newText =
                titleRef.current.textContent === "Strings of Mastery"
                  ? "Elegance in Sound"
                  : "Strings of Mastery";
              titleRef.current.textContent = newText;

              // Fade in the new text
              gsap.fromTo(
                titleRef.current,
                {
                  opacity: 0,
                  y: 50,
                },
                {
                  opacity: 1,
                  duration: 1,
                  y: 0,
                  ease: "power3.out",
                },
              );
            }
          },
        });
      }
    };

    const intervalId = setInterval(animateText, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main overflow-x-hidden ">
      {isLargeScreen && (
        <div>
          <div className={"max-h-screen"}>
            <VideoBG />

            <div className="text">
              <h1 ref={titleRef}>Strings of Mastery</h1>
            </div>
          </div>
        </div>
      )}
      <div>
        {/*<h1 className={"z-10 monlytitle absolute top-60 p-2"}>*/}
        {/*  Violin Guild of America*/}
        {/*</h1>*/}
      </div>
      {!isLargeScreen && (
        <div className={"mt-4 mb-4"}>
          <ImageSlider />
        </div>
      )}
      <div className={`maincontent ${isLargeScreen ? " -mt-40 lg:mt-0" : ""}`}>
        <Bulletin />
      </div>
    </div>
  );
}
