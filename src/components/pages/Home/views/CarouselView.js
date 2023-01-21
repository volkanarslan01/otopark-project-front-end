import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Park_Image_0 from "../../../../assets/parking.jpg";
import Park_Image_1 from "../../../../assets/parking_2.jpg";
import Park_Image_2 from "../../../../assets/parking_3.jpg";
import classes from "../Home.module.scss";
const CarouselView = () => {
  return (
    <>
      <Carousel
        width={"100%"}
        infiniteLoop={true}
        autoPlay={true}
        transitionTime={3000}
      >
        <div className={classes.box}>
          <img src={Park_Image_0} />
        </div>
        <div>
          <img src={Park_Image_1} />
        </div>
        <div>
          <img src={Park_Image_2} />
        </div>
      </Carousel>
    </>
  );
};

export default CarouselView;
