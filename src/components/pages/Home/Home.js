import classes from "./Home.module.scss";
import { useState, useEffect } from "react";
import MakeReservations from "./controllers/MakeReservation/MakeReservation";
import Feedback from "./controllers/Feedback/Feedback";
import CarouselView from "./views/CarouselView";
import welcome from "../../../assets/welcome.gif";
export default function Home() {
  return (
    <>
      <div className={classes.header}>
        <img src={welcome} alt={"dont img"} />
        <div className={classes.text}>
          <h1 className={classes.h1}>Welcome To The Parking Reservation</h1>
          <p>
            Thanks to this application, the problem of parking is no longer a
            problem for you, you can separate the parking space in seconds with
            a single click
          </p>
        </div>
      </div>
      <div className={classes.carousel}>
        <CarouselView />
      </div>
      <div className={classes.container}>
        <div className={classes.box}>
          <h2 className={classes.h2}>Reservation Operations</h2>
          <MakeReservations />
        </div>
      </div>
      <div>
        <Feedback />
      </div>
    </>
  );
}
