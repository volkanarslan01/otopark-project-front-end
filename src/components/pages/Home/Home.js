import classes from "./Home.module.scss";
import { useState, useEffect } from "react";
import LastReservations from "./Process/LastReservations/LastReservations";
import MakeReservations from "./Process/MakeReservation/MakeReservation";
import Feedback from "./Process/Feedback/Feedback";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Park_Image_0 from "../../../assets/parking.jpg";
import Park_Image_1 from "../../../assets/parking_2.jpg";
import Park_Image_2 from "../../../assets/parking_3.jpg";
import { FaAmazonPay } from "react-icons/fa";
export default function Home() {
  return (
    <>
      <div className={classes.header}>
        <h1>Welcome To The Parking Reservation App</h1>
        <div className={classes.sub}>
          <h3>
            Security Pay <FaAmazonPay className={classes.faPay} />
          </h3>
          <h3>7/24 Customer Service</h3>
        </div>
      </div>
      <div className={classes.carousel}>
        <Carousel width={"100%"} infiniteLoop={true} autoPlay={true}>
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
      </div>

      <div className={classes.container}>
        <div className={classes.box}>
          <MakeReservations />
        </div>
      </div>

      <h2 className={classes.h2}>My Reservations</h2>
      <div className={classes.footer}>
        <div className={classes.footerin}>
          <LastReservations />
        </div>
      </div>

      <div>
        <Feedback />
      </div>
    </>
  );
}
