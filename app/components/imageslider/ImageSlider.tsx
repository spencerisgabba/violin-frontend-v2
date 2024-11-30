import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import "./ImageSlider.scss";
export const ImageSlider = () => {
  const scrollRef = useRef(null);
  const isMediumScreen = useMediaQuery({ query: "(min-width: 932px)" });
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"], // Adjust offsets for desired effect
  });
  const springX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <div className={"overflow-x-hidden wrap"}>
      <motion.div
        drag={!isMediumScreen}
        whileDrag={{ scale: 0.97 }}
        dragConstraints={{
          top: 0,
          right: 0,
          bottom: 0,
          left: -700,
        }}
        style={{
          x: isMediumScreen ? 0 : springX,
        }}
        className="flex relative flex-row space-x-2  cursor-grab lg:cursor-auto lg:justify-between"
      >
        {[1, 2, 3, 4, 5].map((id) => (
          <div key={id} className={"ImageSlider  relative "}>
            <Image
              src={`/IsLargeScreenImages/${id}.jpg`}
              alt={`Image ${id}`}
              className={"pointer-events-none"}
              layout={"fill"}
              objectFit={"cover"}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageSlider;
