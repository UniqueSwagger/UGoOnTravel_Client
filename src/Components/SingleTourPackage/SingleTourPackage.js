import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./SingleTourPackage.css";
import axios from "axios";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Loader from "../Loader/Loader";
import SingleTourPackageInfo from "../SingleTourPackageInfo/SingleTourPackageInfo";
const SingleTourPackage = () => {
  window.scrollTo(0, 40);
  const [particularPackage, setParticularPackage] = useState([]);
  const { id } = useParams();

  //getting the particular package
  useEffect(() => {
    axios
      .get(`https://grisly-werewolf-76792.herokuapp.com/packages/${id}`)
      .then((res) => setParticularPackage(res.data));
  }, [id]);
  const { accommodation, galleryImages } = particularPackage;
  let restGalleryImages = galleryImages?.length && [...galleryImages];

  //removing the first image from galleryImages array and showing the rests
  restGalleryImages?.splice(0, 1);

  const [photoIndex, setPhotoIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {galleryImages?.length ? (
        <div className="mx-lg-5 mx-3">
          <div>
            <div className="my-5 ">
              <div className="row">
                <div className="col-lg-6 w-50 col-12 gallery-image main-gallery-image mb-lg-0 mb-3">
                  <img
                    onClick={() => {
                      setIsOpen(true);
                      setPhotoIndex(0);
                    }}
                    style={{ borderRadius: "10px", cursor: "pointer" }}
                    className="img-fluid w-100"
                    decoding="async"
                    src={galleryImages?.[0]}
                    alt={accommodation}
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <div className="row row-cols-2 g-3">
                    {restGalleryImages?.map((image, index) => {
                      return (
                        <div key={index} className="w-50 ">
                          <img
                            onClick={() => {
                              setIsOpen(true);
                              setPhotoIndex(index + 1);
                            }}
                            style={{ borderRadius: "10px", cursor: "pointer" }}
                            className="img-fluid w-100 gallery-image"
                            src={image}
                            decoding="async"
                            alt={accommodation}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {isOpen && (
                <Lightbox
                  mainSrc={galleryImages?.[photoIndex]}
                  nextSrc={
                    galleryImages?.[(photoIndex + 1) % galleryImages?.length]
                  }
                  prevSrc={
                    galleryImages[
                      (photoIndex + galleryImages?.length - 1) %
                        galleryImages?.length
                    ]
                  }
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + galleryImages.length - 1) %
                        galleryImages.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % galleryImages.length)
                  }
                />
              )}
            </div>
            <SingleTourPackageInfo particularPackage={particularPackage} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SingleTourPackage;
