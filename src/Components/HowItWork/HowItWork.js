import React from "react";
import BookRelaxImg from "../../images/book.png";
import smartImg from "../../images/smart.png";
import saveImg from "../../images/save.png";

const HowItWork = () => {
  return (
    <div>
      <div className="text-center">
        <h2>How It Work</h2>
        <p className="fs-4 text-white-50">Keep calm & travel on</p>
      </div>
      <div className="d-flex flex-lg-row flex-column my-5 py-5">
        <div className="text-center">
          <img
            className="img-fluid w-50 mx-auto d-block mt-3"
            src={BookRelaxImg}
            alt="relaxImage"
          />
          <h3 className="my-3">Book & Relax</h3>
          <p className=" fs-5 w-75 mx-auto text-white-50">
            UGoOnTravel makes searching for and creating your own cheap vacation
            packages super easy, so you can sit back and relax.
          </p>
        </div>
        <div className="text-center">
          <img
            className="img-fluid w-50 mx-auto d-block mt-3"
            src={smartImg}
            alt="relaxImage"
          />
          <h3 className="my-3">Smart checklist</h3>
          <p className=" fs-5 w-75 mx-auto text-white-50">
            Check health information sources.Book in advance.Review travel
            advisories. Check for restrictions at both your origin and travel
            destinations
          </p>
        </div>
        <div className="text-center">
          <img
            className="img-fluid w-50 mx-auto d-block mt-3 "
            src={saveImg}
            alt="relaxImage"
          />
          <h3 className="my-3">Save more</h3>
          <p className=" fs-5 w-75 mx-auto text-white-50">
            Stay cheap. It has probably taken a few lifestyle changes to save up
            some money for travel so why change that when you travel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
