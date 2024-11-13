export const VideoBG = () => {
    return (
            <div className="homeimg">
                <video preload="auto" controls={false} playsInline autoPlay muted loop>
                    <source src="https://videos.pexels.com/video-files/5652224/5652224-uhd_3840_2160_24fps.mp4"
                            type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
    );
};