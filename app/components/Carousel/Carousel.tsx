
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import Image from 'next/image'; // Import Next.js Image component
import  "./carouselStyle.module.scss"; // Use CSS modules

const IMAGES = [
    {
        id: 0,
        imageSrc: "/images/duotoneRepair.jpg",
        title: "Repair",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id tristique ipsum. Donec ac lacus eu purus hendrerit mattis et ac magna. Duis non tincidunt eros. Cras feugiat dui sit amet nisl accumsan, ut hendrerit justo pellentesque. Integer at nisi ac sapien feugiat eleifend sed non turpis. Proin elementum vitae lectus sed pretium. Quisque maximus sit amet nisi non congue. Sed ut vestibulum leo. Fusce vitae molestie odio. Phasellus consequat urna enim, sit amet rutrum elit porta commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam vitae augue orci. ",
    },
    {
        id: 1,
        imageSrc: "/images/duotoneRepair.jpg",
        title: "Replace",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id tristique ipsum. Donec ac lacus eu purus hendrerit mattis et ac magna. Duis non tincidunt eros. Cras feugiat dui sit amet nisl accumsan, ut hendrerit justo pellentesque. Integer at nisi ac sapien feugiat eleifend sed non turpis. Proin elementum vitae lectus sed pretium. Quisque maximus sit amet nisi non congue. Sed ut vestibulum leo. Fusce vitae molestie odio. Phasellus consequat urna enim, sit amet rutrum elit porta commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam vitae augue orci. ",
    },
];

// Define direction as a number type that can also include 0
type Direction = 1 | -1 | 0;

const sliderVariants = {
    incoming: (direction: Direction) => ({
        x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
        scale: 1.2,
        opacity: 0,
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction: Direction) => ({
        x: direction > 0 ? "-100%" : direction < 0 ? "100%" : 0,
        scale: 1,
        opacity: 0.2,
    }),
};

const titleVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
};

const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
};

export default function Carousel() {
    const [[imageCount, direction], setImageCount] = useState<[number, Direction]>([0, 0]);
    const activeImageIndex = wrap(0, IMAGES.length, imageCount);

    const swipeToImage = (swipeDirection: Direction) => {
        setImageCount([imageCount + swipeDirection, swipeDirection]);
    };

    const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
        const draggedDistance = dragInfo.offset.x;
        const swipeThreshold = 50;
        if (draggedDistance > swipeThreshold) {
            swipeToImage(-1); // Swipe left
        } else if (draggedDistance < -swipeThreshold) {
            swipeToImage(1); // Swipe right
        }
    };

    const skipToImage = (imageId: number) => {
        if (imageId === activeImageIndex) {
            return; // No need to change if the image is already active
        }

        const changeDirection: Direction = imageId > activeImageIndex ? 1 : -1; // Determine the change direction
        setImageCount([imageId, changeDirection]); // Update the state with the new index and direction
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
            swipeToImage(-1);
        } else if (event.key === "ArrowRight") {
            swipeToImage(1);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className={"main"}>
            <div className={"sliderContainer"}>
                <div className={"slider"}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={`'some-constant-value'+${IMAGES[activeImageIndex].title}`}
                            className={"image"}
                            custom={direction}
                            variants={sliderVariants}
                            initial="incoming"
                            animate="active"
                            exit="exit"
                            transition={sliderTransition}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                            style={{
                                position: 'relative',
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Image
                                src={IMAGES[activeImageIndex].imageSrc}
                                alt={IMAGES[activeImageIndex].title}
                                layout="fill"
                                objectFit="cover"
                                className={"image"}
                            />
                            <motion.div className={"overlay"}>
                                <AnimatePresence>
                                    <motion.h1
                                        key={`'title-'+${IMAGES[activeImageIndex].title}`}
                                        variants={titleVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.6, delay: 0.55, ease: "easeInOut" }}
                                    >
                                        {IMAGES[activeImageIndex].title}
                                    </motion.h1>
                                    <motion.p
                                        key={`'content-'+${IMAGES[activeImageIndex].title}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit="exit"
                                        transition={{ duration: 0.8, delay: 0.75, ease: "easeInOut" }}
                                    >
                                        {IMAGES[activeImageIndex].description}
                                    </motion.p>
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={"buttons"}>
                    <button onClick={() => swipeToImage(-1)}>PREV</button>
                    <button onClick={() => swipeToImage(1)}>NEXT</button>
                </div>
            </div>

            <div className={"thumbnails"}>
                {IMAGES.map((image) => (
                    <div
                        key={image.id}
                        onClick={() => skipToImage(image.id)}
                        className={"thumbnailContainer"}
                    >
                        <div
                            className={"thumbnail"}
                            style={{
                                backgroundImage: `url(${image.imageSrc})`,
                            }}
                        />
                        <div
                            className={`${"activeIndicator"} ${image.id === activeImageIndex ? "active" : ""}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
