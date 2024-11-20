export const VideoBG = () => {
  return (
    <div className="homeimg">
      <video preload="true" controls={false} playsInline autoPlay muted loop>
        <source
          src="https://res.cloudinary.com/dztnyrx5z/video/upload/v1732058868/IMG_0555-vmake_sazm5v.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
