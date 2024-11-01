import React, { useState, useEffect } from 'react';

export default function Dw() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            {isClient &&
                <video autoPlay loop playsInline={true} muted={true} crossOrigin={"anonymous"}>
                    <source src="/videos/train.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            }
        </div>
    );
}