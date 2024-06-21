import React from "react";
import "./HerSection.css";
import HeroImage from "../../images/HeroImage.png";

const HeroSection = () => {
  return (
    <div className="d-flex mx-lg-5 align-items-center flex-column flex-lg-row my-5">
      <div className="w-50 hero-text pb-5 mb-5">
        <h1 style={{ color: "##ebebeb" }} className="display-2 fw-bold ">
          Hotel, Resort & Experiences
        </h1>
        <p className=" w-75 fs-4 py-3 text-white-50">
          Accompanying us, you have a trip full of experiences. With
          UGoOnTravel, booking accommodation, resort villas, hotels
        </p>
      </div>
      <div className="w-50 hero-image">
        <img
          className="img-fluid w-100 "
          loading="lazy"
          src={HeroImage}
          alt="HeroImage"
        />
      </div>
    </div>
  );
};

export default HeroSection;
