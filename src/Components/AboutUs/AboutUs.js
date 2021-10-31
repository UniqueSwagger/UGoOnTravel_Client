import React from "react";
import aboutUsImg from "../../images/about-us.png";
import sRahmanImg from "../../images/s.rahman.jpg";
import mRahmanImg from "../../images/m-rahman.jpg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <div className="row align-items-center mx-4 my-5 py-5">
        <div className="col-lg-6 col-12 ">
          <h2 className="display-5">👋 About Us.</h2>
          <p className="text-muted fs-4">
            No matter who you are, or where you are going, our travel brands
            help every type of traveler not only find the trip that’s right for
            them, but get the best value every time.
          </p>
        </div>
        <div className="col-lg-6 col-12 ">
          <img className="img-fluid" src={aboutUsImg} alt="about us hero" />
        </div>
      </div>
      <div className="text-center my-5 ">
        <h2>⛱ Founder</h2>
        <p className="text-muted fs-4">Our honorable founders</p>
      </div>
      <div className="d-flex  align-items-center justify-content-around">
        <div className="founder" style={{ width: "20%" }}>
          <img
            style={{ borderRadius: "30px" }}
            className="img-fluid "
            src={sRahmanImg}
            alt="images"
          />
          <h3 className="my-2">S Rahman</h3>
          <p className="text-muted fs-5">Co-founder and Chief Executive</p>
        </div>
        <div className="founder" style={{ width: "20%" }}>
          <img
            style={{ borderRadius: "30px" }}
            className="img-fluid"
            src={mRahmanImg}
            alt="images"
          />
          <h3 className="my-2">Mahmudur Rahman</h3>
          <p className="text-muted fs-5">Co-founder and Chairmen</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
