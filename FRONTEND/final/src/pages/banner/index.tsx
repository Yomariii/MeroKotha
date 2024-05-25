import React from "react";

interface BannerProps {
  // Add props if needed
}

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://www.vecteezy.com/vector-art/22277165-house-interior-with-kitchen-living-room-hall"
                className=" avash  w-100 h-50" // Adjusted height to h-50
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.nepalhomes.com/_next/image?url=https%3A%2F%2Fwww.nepalhomes.com%2Fpublic%2Ffiles%2F154CB286FA33469-Web-banner%20(1).png&w=1920&q=75"
                className=" avash w-100 h-50" // Adjusted height to h-50
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.nepalhomes.com/_next/image?url=https%3A%2F%2Fwww.nepalhomes.com%2Fpublic%2Ffiles%2F154CB286FA33469-Web-banner%20(1).png&w=1920&q=75"
                className="avash w-100 h-50" // Adjusted height to h-50
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/*  for card */}
      </div>
      {/*  for card  */}
    </>
  );
};

export default Banner;
