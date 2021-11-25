import axios from "axios";
import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const MakeAdmin = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = React.useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    axios
      .put("https://grisly-werewolf-76792.herokuapp.com/users/admin", data)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire(
            "Successfully made admin",
            `You have made ${data.email} an admin`,
            "success"
          );
        } else {
          Swal.fire(
            "Already an admin",
            `You have made ${data.email} an admin already`,
            "warning"
          );
        }
        setLoading(false);
      });
  };
  return (
    <div>
      <Form className="my-5 w-50 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            required
            {...register("email")}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        {loading ? (
          <Button className="me-auto d-block my-5 w-50" disabled>
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
          <Button className="me-auto d-block my-5 w-50" type="submit">
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
};

export default MakeAdmin;
