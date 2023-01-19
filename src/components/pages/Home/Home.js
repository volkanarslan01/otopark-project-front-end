import classes from "./Home.module.scss";
import { useState, useEffect } from "react";
import LastReservations from "./Process/LastReservations.js";
import MakeReservations from "./Process/MakeReservation.js";
import Feedback from "./Process/Feedback.js";
import Park from "../../../assets/parking.jpg";
export default function Home() {
  return (
    <>
      <div className={classes.container}>
        <img src={Park} className={classes.img} />
        <div className={classes.box}>
          <h2> Make Reservations</h2>
          <MakeReservations className={classes.makeReservations} />
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
