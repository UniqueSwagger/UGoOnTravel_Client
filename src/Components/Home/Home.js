import React from "react";
import HappeningCities from "../HappeningCities/HappeningCities";
import HeroSection from "../HeroSection/HeroSection";
import HowItWork from "../HowItWork/HowItWork";
import NewsLetter from "../NewsLetter/NewsLetter";
import TourPackage from "../TourPackage/TourPackage";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TourPackage />
      <HappeningCities />
      <HowItWork />
      <NewsLetter />
    </div>
  );
};

export default Home;
