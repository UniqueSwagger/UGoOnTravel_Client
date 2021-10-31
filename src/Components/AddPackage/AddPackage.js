import React, { useState } from "react";
import { Container, Button, Form, Row, Spinner } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router";
import placeholderImage from "../../images/placeholder.png";

const AddPackage = () => {
  const history = useHistory();
  const [bannerImage, setBannerImage] = useState([]);
  const onBannerDrop = (pictureFiles, pictureDataURLs) => {
    setBannerImage(pictureDataURLs);
  };
  const [galleryImage1, setGalleryImage1] = useState([]);
  const onGallery1Drop = (pictureFiles, pictureDataURLs) => {
    setGalleryImage1(pictureDataURLs);
  };
  const [galleryImage2, setGalleryImage2] = useState([]);
  const onGallery2Drop = (pictureFiles, pictureDataURLs) => {
    setGalleryImage2(pictureDataURLs);
  };
  const [galleryImage3, setGalleryImage3] = useState([]);
  const onGallery3Drop = (pictureFiles, pictureDataURLs) => {
    setGalleryImage3(pictureDataURLs);
  };
  const [galleryImage4, setGalleryImage4] = useState([]);
  const onGallery4Drop = (pictureFiles, pictureDataURLs) => {
    setGalleryImage4(pictureDataURLs);
  };
  const [galleryImage5, setGalleryImage5] = useState([]);
  const onGallery5Drop = (pictureFiles, pictureDataURLs) => {
    setGalleryImage5(pictureDataURLs);
  };

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (
      !(
        bannerImage.length &&
        galleryImage1.length &&
        galleryImage2.length &&
        galleryImage3.length &&
        galleryImage4.length &&
        galleryImage5.length
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: `Required at least 6 Images`,
      });
    } else {
      setLoading(true);
      data.bannerImage = bannerImage;
      data.galleryImages = [
        galleryImage1,
        galleryImage2,
        galleryImage3,
        galleryImage4,
        galleryImage5,
      ];
      axios
        .post("https://grisly-werewolf-76792.herokuapp.com/newPackage", data)
        .then(() => setLoading(false))
        .then(() => {
          Swal.fire(
            "Good job!",
            "Successfully added a new package!",
            "success"
          ).then(() => {
            window.scrollTo(0, 40);
            history.push("/home");
          });
        });
    }
  };
  return (
    <Container style={{ borderRadius: "35px" }} className="p-5 border my-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row xs={1} sm={1} md={2}>
          <div className="text-black">
            <div className="d-flex">
              <img
                style={{ borderRadius: "20px" }}
                className="w-50 d-block my-2 h-75 mx-auto"
                src={bannerImage.length ? bannerImage : placeholderImage}
                alt=""
              />
              <ImageUploader
                className="w-50 ms-2"
                label="For Banner Image"
                buttonText="Choose Image"
                withIcon={true}
                singleImage
                onChange={onBannerDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />{" "}
            </div>
            <div className="d-flex">
              <img
                style={{ borderRadius: "20px" }}
                className="w-50 d-block my-2 h-75 mx-auto"
                src={galleryImage1.length ? galleryImage1 : placeholderImage}
                alt=""
              />
              <ImageUploader
                className="w-50 ms-2"
                label="For Galley Image"
                buttonText="Choose Image"
                withIcon={true}
                singleImage
                onChange={onGallery1Drop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />{" "}
            </div>
            <div className="d-flex">
              <img
                style={{ borderRadius: "20px" }}
                className="w-50 d-block my-2 h-75 mx-auto"
                src={galleryImage2.length ? galleryImage2 : placeholderImage}
                alt=""
              />
              <ImageUploader
                className="w-50 ms-2"
                label="For Galley Image"
                buttonText="Choose Image"
                withIcon={true}
                singleImage
                onChange={onGallery2Drop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />{" "}
            </div>
            <div className="d-flex">
              <img
                style={{ borderRadius: "20px" }}
                className="w-50 d-block my-2 h-75 mx-auto"
                src={galleryImage3.length ? galleryImage3 : placeholderImage}
                alt=""
              />
              <ImageUploader
                className="w-50 ms-2"
                label="For Galley Image"
                buttonText="Choose Image"
                withIcon={true}
                singleImage
                onChange={onGallery3Drop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />{" "}
            </div>
            <div className="d-flex">
              <img
                style={{ borderRadius: "20px" }}
                className="w-50 d-block my-2 h-75 mx-auto"
                src={galleryImage4.length ? galleryImage4 : placeholderImage}
                alt=""
              />
              <ImageUploader
                className="w-50 ms-2"
                label="For Galley Image"
                buttonText="Choose Image"
                withIcon={true}
                singleImage
                onChange={onGallery4Drop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
            </div>
            <div className="d-flex">
              <img
                style={{ borderRadius: "20px" }}
                className="w-50 d-block my-2 h-75 mx-auto"
                src={galleryImage5.length ? galleryImage5 : placeholderImage}
                alt=""
              />
              <ImageUploader
                className="w-50 ms-2"
                label="For Galley Image"
                buttonText="Choose Image"
                withIcon={true}
                singleImage
                onChange={onGallery5Drop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
            </div>
          </div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Accommodation</Form.Label>
              <Form.Control
                required
                {...register("accommodation")}
                type="text"
                placeholder="Enter accommodation"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                {...register("location")}
                type="text"
                placeholder="Enter Location"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price Per Night</Form.Label>
              <Form.Control
                required
                {...register("pricePerNight")}
                type="number"
                placeholder="Enter the price for per night "
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                required
                {...register("rating")}
                type="number"
                min="0"
                max="5"
                step=".01"
                placeholder="Enter rating"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rater</Form.Label>
              <Form.Control
                required
                {...register("rater")}
                type="number"
                min="0"
                placeholder="Enter Rater People"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                required
                {...register("bedrooms")}
                type="number"
                min="0"
                placeholder="Enter Bedrooms Quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                required
                {...register("bathrooms")}
                type="number"
                min="0"
                placeholder="Enter Bathrooms Quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Balconies</Form.Label>
              <Form.Control
                required
                {...register("balconies")}
                type="number"
                min="0"
                placeholder="Enter Balconies Quantity"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Short Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Enter short description of that place"
                rows={4}
                {...register("shortDescription")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">About</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Say something about this place"
                rows={4}
                {...register("about")}
              />
            </Form.Group>
          </div>
        </Row>
        {loading ? (
          <Button
            style={{ width: "26%" }}
            variant="primary"
            className="ms-auto d-block shadow-none"
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
            style={{ width: "26%" }}
            className="ms-auto  d-block shadow-none"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default AddPackage;
