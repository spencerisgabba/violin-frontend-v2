import { useState, MouseEvent } from 'react';
import '@/app/components/ZoomImage/ZoomImage.scss';
import Image, { StaticImageData } from 'next/image'; // Import StaticImageData type

interface ZoomImageProps {
    src: string | StaticImageData;
    alt: string;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt }) => {
    const [isActiveMode, setIsActiveMode] = useState(false);
    const [transformOrigin, setTransformOrigin] = useState('50% 50%'); // Center by default

    const handleClick = () => {
        setIsActiveMode((prevMode) => !prevMode);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const offsetX = e.pageX - e.currentTarget.offsetLeft;
        const offsetY = e.pageY - e.currentTarget.offsetTop;
        const width = e.currentTarget.clientWidth;
        const height = e.currentTarget.clientHeight;

        const originX = (offsetX / width) * 100;
        const originY = (offsetY / height) * 100;

        setTransformOrigin(`${originX}% ${originY}%`);
    };

    return (
        <div>
            <div
                className={`zoom_image ${isActiveMode ? 'zoom_mode_active' : ''}`}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                style={{ overflow: 'hidden' }}
            >
                <Image
                    loading="lazy"
                    width={50}
                    src={src}
                    height={50}
                    alt={alt}
                    style={{
                        transform: isActiveMode ? (window.innerWidth > 767 ? 'scale(2)' : 'scale(5)') : 'scale(1)',
                        transformOrigin: transformOrigin,
                        transition: 'transform 0.3s ease', // Smooth transition
                    }}
                />
            </div>
        </div>
    );
};

export default ZoomImage;
