import classes from "./Home.module.scss";
import { useState, useEffect } from "react";
import LastReservations from "./Process/LastReservations.js";
import MakeReservations from "./Process/MakeReservation.js";
export default function Home() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.box}>
          <h2> Make Reservations</h2>
          <MakeReservations />
        </div>
      </div>

      <h2 className={classes.h2}>My Reservations</h2>
      <div className={classes.footer}>
        <div className={classes.footerin}>
          <LastReservations />
        </div>
      </div>
    </>
  );
}
