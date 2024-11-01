import React from 'react';

const VideoComponent = () => {
    return (
        <div className="video-container">
            <video className="video-element" autoPlay loop muted>
                <source src="/videos/train.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoComponent;