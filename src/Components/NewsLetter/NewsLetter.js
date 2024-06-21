import React from "react";
import newsLetterImg from "../../images/newsLetter.png";
import { Badge } from "react-bootstrap";
const NewsLetter = () => {
  return (
    <div className="mx-5 my-5 py-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h2>Join our newsletter 🎉</h2>
          <p style={{ width: "90%" }} className="my-4  fs-4 ">
            Read and share new perspectives on just about any topic. Everyone’s
            welcome.
          </p>
          <div className="fs-5 my-3">
            <Badge className="me-3" pill bg="primary">
              01
            </Badge>

            <span>Get more discount</span>
          </div>
          <div className="fs-5 my-3">
            <Badge className="me-3" pill bg="danger">
              02
            </Badge>

            <span>Get premium magazines</span>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            className="img-fluid"
            src={newsLetterImg}
            alt="newsLetterImage"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
