import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Container, Col, Card } from "react-bootstrap";
import Loader from "../Loader/Loader";
import "./TourPackage.css";
const TourPackage = () => {
  const history = useHistory();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ug-o-on-travel-server.vercel.app/packages", {
          timeout: 10000,
        });
        setPlaces(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);
  const handleBookNow = (id) => {
    history.push(`/packages/${id}`);
  };
  return (
    <div id="packages">
      {places.length ? (
        <div
          style={{ borderRadius: "40px", background: "#0E131F" }}
          className=" py-4 my-4"
        >
          <div className="text-center my-5">
            <h1>Featured places to stay</h1>
            <p className=" w-50 mx-auto  fs-4 py-3 text-white-50">
              Popular places to stay that UGoOnTravel recommends for you. Select
              Your Best Package For Your Travel
            </p>
          </div>
          <Container>
            <Row xs={1} md={2} lg={3} className="g-4 mb-5">
              {places?.map((place) => {
                const {
                  accommodation,
                  bannerImage,
                  shortDescription,
                  bedrooms,
                  location,
                  pricePerNight,
                  rating,
                  rater,
                  _id,
                } = place;
                return (
                  <Col key={_id}>
                    <Card
                      className="h-100 "
                      style={{
                        background: "rgb(17 24 39)",
                        borderRadius: "45px",
                      }}
                    >
                      <Card.Img
                        className="img-fluid accommodation"
                        variant="top"
                        loading="lazy"
                        src={bannerImage}
                      />
                      <Card.Body className="d-flex flex-column">
                        <p className="text-white-50">
                          Entire Cabin - {bedrooms} bedrooms
                        </p>
                        <Card.Title className="fs-4 text-white-50">
                          {accommodation}
                        </Card.Title>
                        <Card.Text className=" fs-5 text-white-50">
                          {shortDescription}
                        </Card.Text>
                        <p className=" mt-auto text-white-50">
                          <i className="fas fa-map-marker-alt"></i> {location}
                        </p>
                        <div className="d-flex align-items-center justify-content-between mt-auto">
                          <div>
                            <p>
                              <span className="fw-bold fs-5 text-white-50">
                                ${pricePerNight}
                              </span>
                              <span className="text-white-50"> /night</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              <i
                                style={{ color: "#EF4444" }}
                                className="fas fa-star text-white-50"
                              ></i>{" "}
                              <span className="fw-bold text-white-50">{rating}</span>{" "}
                              <span className="text-white-50">({rater})</span>
                            </p>
                          </div>
                        </div>
                      </Card.Body>
                      <button
                        onClick={() => handleBookNow(_id)}
                        className="button button--anthe"
                      >
                        <span className="fs-5  fw-bold ">Book Now</span>
                      </button>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TourPackage;