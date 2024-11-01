import React, { useState, useEffect } from 'react';

export default function Dw() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            {isClient &&
                <video autoPlay loop >
                    <source src="/train.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            }
        </div>
    );
}