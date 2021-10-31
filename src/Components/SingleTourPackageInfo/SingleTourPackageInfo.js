import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-date-picker";
import "./SingleTourPackageInfo.css";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
const SingleTourPackageInfo = (props) => {
  //getting info of particular package

  const {
    accommodation,
    location,
    rating,
    rater,
    about,
    pricePerNight,
    bedrooms,
    bathrooms,
    balconies,
    shortDescription,
    bannerImage,
  } = props.particularPackage;

  const [userRegisteredBookings, setUserRegisteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  error &&
    Swal.fire({
      icon: "error",
      title: "Something went wrong!",
      text: `${error}`,
    });

  //getting user info
  const {
    currentUser: { displayName, email },
  } = useAuth();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  //getting all booking info of the user
  useEffect(() => {
    axios
      .get(`https://grisly-werewolf-76792.herokuapp.com/bookingInfo/${email}`)
      .then((res) => setUserRegisteredBookings(res.data));
  }, [email]);

  //handling date picker
  const [fromValue, onChange] = useState(new Date());
  const [toValue, onToChange] = useState(new Date());
  const fromDate = `${fromValue.getDate()}/${
    fromValue.getMonth() + 1
  }/${fromValue.getFullYear()}`;
  const toDate = `${toValue.getDate()}/${
    toValue.getMonth() + 1
  }/${toValue.getFullYear()}`;
  const ms = moment(toDate, "DD/MM/YYYY ").diff(
    moment(fromDate, "DD/MM/YYYY ")
  );
  const defaultToDate = moment(fromValue).add(1, "days").toDate();
  const stayNights = ms / (1000 * 3600) / 24 < 1 ? 1 : ms / (1000 * 3600) / 24;
  const totalCost = pricePerNight * stayNights;
  const serviceCharge = totalCost > 120 ? 20 : 0;
  const grandTotal = totalCost + serviceCharge;

  const onSubmit = (data) => {
    setLoading(true);
    // giving some more info
    data.pricePerNight = pricePerNight;
    data.total = grandTotal;
    data.fromDate = fromDate;
    data.accommodation = accommodation;
    data.bannerImage = bannerImage;
    data.shortDescription = shortDescription;
    data.status = "pending";
    data.toDate =
      toValue.getDate() === new Date().getDate()
        ? `${defaultToDate.getDate()}/${
            defaultToDate.getMonth() + 1
          }/${defaultToDate.getFullYear()}`
        : toDate;

    //watching that user has already booked an accommodation or not
    const exist = userRegisteredBookings.find(
      (booking) => booking.accommodation === data.accommodation
    );
    console.log(exist);
    if (exist) {
      window.scrollTo(0, 40);
      setError("You have already registered for this accommodation");
      setLoading(false);
    } else {
      setError("");
      axios
        .post("https://grisly-werewolf-76792.herokuapp.com/booking", data)
        .then((res) => {
          if (res.data.insertedId) {
            history.push(`/registeredBooking/${data.email}`);
            setLoading(false);
          }
        });
    }
  };
  return (
    <div className="my-5 ">
      <div className="row">
        <div
          style={{ borderRadius: "30px" }}
          className="col-lg-7 col-12 p-lg-5 p-3 border border-secondary mt-5 mb-2 me-5"
        >
          <div>
            <h2>{accommodation}</h2>
          </div>
          <div className="d-flex  align-items-center mt-3">
            <div className="me-4">
              <p className="text-muted mt-auto">
                <i className="fas fa-map-marker-alt"></i> {location}
              </p>
            </div>
            <div>
              <p>
                <i style={{ color: "#EF4444" }} className="fas fa-star"></i>{" "}
                <span className="fw-bold">{rating}</span>{" "}
                <span className="text-muted">({rater})</span>
              </p>
            </div>
          </div>
          <p className="text-muted fs-4">{about}</p>
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-around mt-5">
            <div>
              <h5>
                <i className="fas fa-bed me-3"></i> {bedrooms} bedrooms
              </h5>
            </div>
            <div>
              <h5>
                <i className="fas fa-bath me-3"></i> {bathrooms} bathrooms
              </h5>
            </div>
            <div>
              <h5>
                <i className="fas fa-door-open me-3"></i> {balconies} balconies
              </h5>
            </div>
          </div>
        </div>

        <div
          style={{ borderRadius: "30px" }}
          className="col-lg-4 col-12 p-3 border border-secondary mt-5 mb-2 ms-lg-3"
        >
          <div>
            <h3 className="text-center mb-3">Book this package</h3>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-auto">
            <div>
              <p>
                <span className="fw-bold fs-5 ">${pricePerNight}</span>
                <span className="text-muted"> /night</span>
              </p>
            </div>
            <div>
              <p>
                <i style={{ color: "#EF4444" }} className="fas fa-star"></i>{" "}
                <span className="fw-bold">{rating}</span>{" "}
                <span className="text-muted">({rater})</span>
              </p>
            </div>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Full Name</Form.Label>
              <Form.Control
                required
                defaultValue={displayName}
                type="text"
                className="fs-5"
                placeholder="Your Full Name"
                {...register("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Email address</Form.Label>
              <Form.Control
                required
                defaultValue={email}
                type="email"
                className="fs-5"
                placeholder="Your Email"
                {...register("email")}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Your Phone</Form.Label>
              <Form.Control
                required
                type="number"
                className="fs-5"
                placeholder="Your Phone Number"
                {...register("phone")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Address</Form.Label>
              <Form.Control
                required
                className="fs-5"
                placeholder="Enter address"
                {...register("address")}
              />
            </Form.Group>
            <div className="d-flex ">
              <Form.Group className="mb-3 me-3">
                <Form.Label className="fs-5">From</Form.Label>
                <DatePicker
                  format="dd/MM/y"
                  className=" form-control"
                  onChange={onChange}
                  value={fromValue}
                  minDate={moment().toDate()}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fs-5">To</Form.Label>
                <DatePicker
                  format="dd/MM/y"
                  className="form-control"
                  onChange={onToChange}
                  value={toValue}
                  minDate={defaultToDate}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Any special message</Form.Label>
              <Form.Control
                className="fs-5"
                as="textarea"
                placeholder="Message"
                rows={4}
                {...register("message")}
              />
            </Form.Group>
            <div className="d-flex justify-content-between text-muted  my-3 fs-5">
              <span>
                ${pricePerNight} x {stayNights} night
              </span>
              <span>${totalCost}</span>
            </div>
            <div className="d-flex justify-content-between text-muted my-3 fs-5">
              <span>Service charge</span>
              <span>${serviceCharge}</span>
            </div>
            <div className="border-bottom border-white border-2 my-3 "></div>
            <div className="d-flex justify-content-between fw-bold fs-4">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
            {loading ? (
              <Button
                variant="primary"
                className="my-5 w-100 p-2 fs-5 shadow-none"
                disabled
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                className="my-5 w-100 p-2 fs-5 shadow-none"
              >
                Place booking
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SingleTourPackageInfo;
