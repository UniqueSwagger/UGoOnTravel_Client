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
  useEffect(() => {
    axios
      .get("https://grisly-werewolf-76792.herokuapp.com/packages")
      .then((res) => setPlaces(res.data));
  }, [places]);
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
            <p className="text-muted w-50 mx-auto  fs-4 py-3">
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
                      className="h-100"
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
                        <p className="text-muted">
                          Entire Cabin - {bedrooms} bedrooms
                        </p>
                        <Card.Title className="fs-4">
                          {accommodation}
                        </Card.Title>
                        <Card.Text className="text-muted fs-5">
                          {shortDescription}
                        </Card.Text>
                        <p className="text-muted mt-auto">
                          <i className="fas fa-map-marker-alt"></i> {location}
                        </p>
                        <div className="d-flex align-items-center justify-content-between mt-auto">
                          <div>
                            <p>
                              <span className="fw-bold fs-5 ">
                                ${pricePerNight}
                              </span>
                              <span className="text-muted"> /night</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              <i
                                style={{ color: "#EF4444" }}
                                className="fas fa-star"
                              ></i>{" "}
                              <span className="fw-bold">{rating}</span>{" "}
                              <span className="text-muted">({rater})</span>
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
