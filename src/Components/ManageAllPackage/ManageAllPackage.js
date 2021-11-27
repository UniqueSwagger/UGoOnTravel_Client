import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import "./ManageAllPackage.css";

const ManageAllPackage = () => {
  const [registeredBookings, setRegisteredBookings] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [updatedBooking, setUpdatedBooking] = useState(false);
  //getting all booking info
  useEffect(() => {
    axios
      .get("https://grisly-werewolf-76792.herokuapp.com/bookingInfo")
      .then((res) => setRegisteredBookings(res.data));
  }, [updated, updatedBooking]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you wanna delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("deleted!", "Successfully deleted this booking", "success");
        axios
          .delete(
            `https://grisly-werewolf-76792.herokuapp.com/registeredBooking/${id}`
          )
          .then((res) => {
            if (res.data.deletedCount) {
              const remaining = registeredBookings.filter(
                (myPackage) => myPackage._id !== id
              );
              setRegisteredBookings(remaining);
            }
          });
      }
    });
  };

  const handleUpdate = (id) => {
    Swal.fire({
      title: "Are you sure you wanna update status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Updated!", "Successfully updated booking status", "success");
        axios
          .put(
            `https://grisly-werewolf-76792.herokuapp.com/registeredBooking/${id}`,
            { status: "approved" }
          )
          .then((res) => {
            if (res.data.modifiedCount) {
              setUpdated(true);
              setUpdatedBooking(res.data.modifiedCount);
            }
          });
      }
    });
  };

  return (
    <>
      {!(registeredBookings === [] || registeredBookings === null) ? (
        <div className="my-5 mx-3 border p-5 admin">
          <Table responsive>
            <thead className="bg-light ">
              <tr>
                <th className="p-3 name">Name</th>
                <th className="p-3">Email Id</th>
                <th className="p-3">Date</th>
                <th className="p-3">Accommodation</th>
                <th className="p-3">Status</th>
                <th className="pb-3">Update Status</th>
                <th className="pb-3 action">Action</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {registeredBookings?.map(
                ({
                  _id,
                  name,
                  email,
                  fromDate,
                  toDate,
                  accommodation,
                  status,
                }) => (
                  <tr key={_id}>
                    <td className="p-3">
                      <p className="mt-2">{name}</p>
                    </td>
                    <td className="p-3">
                      <p className="mt-2">{email}</p>
                    </td>
                    <td className="p-3">
                      <p className="mt-2">
                        {fromDate} to {toDate}
                      </p>
                    </td>
                    <td style={{ width: "22%" }} className="p-3">
                      <p className="mt-2"> {accommodation}</p>
                    </td>
                    <td className="p-3">
                      <Badge
                        className="px-2 pb-2 pt-1 mt-2"
                        pill
                        bg={`${status === "pending" ? "danger" : "success"}`}
                      >
                        {status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Button
                        disabled={status === "approved"}
                        onClick={() => {
                          handleUpdate(_id);
                        }}
                        variant="info"
                        className="shadow-none text-black fw-bold"
                      >
                        {status === "pending" ? "Update" : "Updated"}
                      </Button>
                    </td>
                    <td className="p-3">
                      <Button
                        className="shadow-none"
                        onClick={() => handleDelete(_id)}
                        variant="danger"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ManageAllPackage;
