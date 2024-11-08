import { useState, MouseEvent } from 'react';
import '@/app/components/ZoomImage/ZoomImage.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ZoomImageProps {
    imageUrls: string; // Comma-separated URLs
    alt: string;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ imageUrls, alt }) => {
    const urlsArray = imageUrls.split(',').map(url => url.trim());
    const [isActiveMode, setIsActiveMode] = useState(false);
    const [transformOrigin, setTransformOrigin] = useState('50% 50%');
    const [currentSrc, setCurrentSrc] = useState(urlsArray[0]);
    const [isBlurring, setIsBlurring] = useState(false);

    const handleClick = () => {
        setIsActiveMode((prevMode) => !prevMode);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;

        const originX = (offsetX / width) * 100;
        const originY = (offsetY / height) * 100;

        setTransformOrigin(`${originX}% ${originY}%`);
    };

    const handleThumbnailClick = (url: string) => {
        if (url === currentSrc) return;
        setIsBlurring(true);
        setTimeout(() => {
            setCurrentSrc(url);
            setIsBlurring(false);
        }, 300); // Duration of the blur and brightness animation
    };

    const defaultImage = "/images/blurredImage.webp";

    return (
        <div>
            <div
                className={`zoom_image ${isActiveMode ? 'zoom_mode_active' : ''}`}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                style={{ overflow: 'hidden', width: '400px', height: '650px' }} // Fixed dimensions
            >
                <motion.div
                    animate={{ filter: isBlurring ? 'blur(20px) brightness(300%)' : 'blur(0px) brightness(100%)' }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', height: '100%' }} // Ensure the motion div takes full space
                >
                    <Image
                        loading="lazy"
                        width={400}
                        height={650}
                        src={currentSrc || defaultImage}
                        quality={100}
                        draggable={false}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover', // Ensures the image covers the container
                            transform: isActiveMode ? (window.innerWidth > 767 ? 'scale(2)' : 'scale(5)') : 'scale(1)',
                            transformOrigin: transformOrigin,
                            transition: 'transform 0.3s ease',
                        }}
                    />
                </motion.div>
            </div>
            <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
                {urlsArray.map((url, index) => (
                    <div key={index} onClick={() => handleThumbnailClick(url)} style={{
                        cursor: 'pointer',
                        border: currentSrc === url ? '2px solid yellow' : '2px solid transparent',
                        borderRadius: '4px',
                        padding: '2px',
                    }}>
                        <Image
                            loading="lazy"
                            width={100}
                            height={100}
                            src={url || defaultImage}
                            quality={100}
                            draggable={false}
                            alt={`Thumbnail of ${alt} ${index + 1}`}
                            className={"h-36"}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZoomImage;
