import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Button, Badge } from "react-bootstrap";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
const MyPackages = () => {
  window.scrollTo(0, 40);
  const {
    currentUser: { email },
  } = useAuth();
  const [myPackages, setMyPackages] = useState(null);

  //setting the user packages
  useEffect(() => {
    axios
      .get(`https://ug-o-on-travel-server.vercel.app/bookingInfo/${email}`)
      .then((res) => setMyPackages(res.data));
  }, [email]);

  //confirming deletion
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure to cancel it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        axios
          .delete(
            `https://ug-o-on-travel-server.vercel.app/registeredBooking/${id}`
          )
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = myPackages.filter(
                (myPackage) => myPackage._id !== id
              );
              setMyPackages(remaining);
            }
          });
      }
    });
  };

  return (
    <>
      {myPackages ? (
        <Container className="my-5">
          {!myPackages?.length ? (
            <div>
              <h1 className="text-center mt-5 pt-5">
                You don't have any Package yet
              </h1>
            </div>
          ) : (
            <Row xs={1} sm={2} md={2} className="g-4">
              {myPackages?.map((myPackage) => {
                const {
                  _id,
                  accommodation,
                  bannerImage,
                  shortDescription,
                  fromDate,
                  toDate,
                  pricePerNight,
                  total,
                  status,
                } = myPackage;
                return (
                  <div style={{ backGround: "rgb(17 24 39)" }} key={_id}>
                    <div
                      style={{ borderRadius: "13px" }}
                      className="d-flex flex-column flex-lg-row border p-3 justify-content-start h-100"
                    >
                      <div className="me-5 w-100 mb-3">
                        <img
                          className="img-fluid rounded"
                          loading="lazy"
                          src={bannerImage}
                          alt={accommodation}
                        />
                        <p className="text-muted my-2">
                          <span className="fs-5">${pricePerNight}</span> / night
                        </p>
                        <h4>Total : ${total}</h4>
                      </div>
                      <div>
                        <h4>{accommodation}</h4>
                        {status === "pending" ? (
                          <Badge className="px-2 pb-2 pt-1" pill bg="danger">
                            pending
                          </Badge>
                        ) : (
                          <Badge className="px-2 pb-2 pt-1" pill bg="success">
                            approved
                          </Badge>
                        )}
                        <p className="text-muted">{shortDescription}</p>
                        <h6>
                          {fromDate} - {toDate}
                        </h6>
                      </div>
                      <div className="d-block ms-auto mt-auto">
                        <Button
                          onClick={() => handleCancel(_id)}
                          className="shadow-none ms-auto "
                          variant="danger"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Row>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyPackages;