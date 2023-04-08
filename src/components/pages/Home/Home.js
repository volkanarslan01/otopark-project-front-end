import classes from "./Home.module.scss";
import { useState, useEffect } from "react";
import MakeReservations from "./controllers/MakeReservation/MakeReservation";
import Feedback from "./controllers/Feedback/Feedback";
import CarouselView from "./views/CarouselView";
import HeaderView from "./views/HeadersView";

export default function Home() {
  return (
    <>
      <div className={classes.header}>
        <HeaderView />
      </div>
      <div className={classes.carousel}>
        <CarouselView />
      </div>
      {/* <div className={classes.container}>
        <div className={classes.box}>
          <MakeReservations />
        </div>
      </div> */}
      <div>
        <Feedback />
      </div>
    </>
  );
}
