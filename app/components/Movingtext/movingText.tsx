"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

const MovingText = () => {
  const [title, setTitle] = useState("Strings of Mastery");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) return;
    const animateText = () => {
      // Trigger the GSAP animation
      gsap.to(".text-heading", {
        opacity: 0,
        duration: 1,
        y: -50,
        ease: "power3.in",
        onComplete: () => {
          // Update the title after the fade-out animation
          setTitle((prevTitle) =>
            prevTitle === "Strings of Mastery"
              ? "Elegance in Sound"
              : "Strings of Mastery",
          );

          // Trigger fade-in animation for the updated text
          gsap.fromTo(
            ".text-heading",
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
        },
      });
    };

    const intervalId = setInterval(animateText, 8000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [isMounted]);
  useEffect(() => {
    setIsMounted(true); // Ensure this runs only on the client.
  }, []);
  return (
    <div className={"absolute w-full"}>
      <div className="text">
        <h1 className="text-heading">{title}</h1>
      </div>
    </div>
  );
};

export default MovingText;
