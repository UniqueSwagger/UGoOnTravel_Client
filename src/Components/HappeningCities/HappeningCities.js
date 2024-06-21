import React from "react";
import { Badge } from "react-bootstrap";
import HappeningCityImg from "../../images/happening-cities.png";

const HappeningCities = () => {
  return (
    <div className="row align-items-center  my-5 py-5 mx-3">
      <div className="col-lg-7 col-12 mb-4 mb-lg-0">
        <img className="img-fluid" src={HappeningCityImg} alt="" />
      </div>
      <div className="col-lg-5 ps-5 col-12">
        <div>
          <p className="fs-5 ">BENEFITS</p>
          <h2>Happening Cities</h2>
        </div>
        <div className="my-5">
          <Badge className="mb-3" pill bg="primary">
            Advertising
          </Badge>
          <h4>Cost-effective advertising</h4>
          <p className="fs-5 text-white-50">
            With a free listing, you can advertise your rental with no upfront
            costs
          </p>
        </div>
        <div className="my-5">
          <Badge className="mb-3" pill bg="success">
            Exposure
          </Badge>
          <h4>Reach millions with UGoOnTravel</h4>
          <p className="fs-5 text-white-50">
            Millions of people are searching for unique places to stay around
            the world
          </p>
        </div>
        <div className="my-5">
          <Badge className="mb-3" pill bg="danger">
            Secure
          </Badge>
          <h4>Secure and simple</h4>
          <p className="fs-5 text-white-50">
            A Holiday Lettings listing gives you a secure and easy way to take
            bookings and payments online
          </p>
        </div>
      </div>
    </div>
  );
};

export default HappeningCities;
