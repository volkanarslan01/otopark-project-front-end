import Axios from "axios";
import Particles from "../../Particles.jsx";
import classes from "./Home.module.scss";
import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import LastReservations from "./Process/LastReservations.js";
import MakeReservations from "./Process/MakeReservation.js";
export default function Home() {
  const [value, onChange] = useState("");
  const [value_1, onChanged] = useState("");
  const [message, setMessage] = useState("");

  const senderDate = () => {
    setMessage(value.toLocaleString() + "-" + value_1.toLocaleString());
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.box}>
          <h2> Make Reservations</h2>

          <div className={classes.date}>
            <DateTimePicker
              className={classes.dateNow}
              onChange={onChange}
              value={value}
            />
            <DateTimePicker
              className={classes.dateNow}
              onChange={onChanged}
              value={value_1}
            />
          </div>
        </div>
      </div>
      <MakeReservations />
      <h2 className={classes.h2}>My Reservations</h2>
      <div className={classes.footer}>
        <div className={classes.footerin}>
          <LastReservations />
        </div>
      </div>
    </>
  );
}
