import Axios from "axios";
import Particles from "../../Particles.jsx";
import classes from "./Home.module.scss";
import { useState, useEffect } from "react";
import Particle from "../../Particles";
import DateTimePicker from "react-datetime-picker";
export default function Home() {
  const [value, onChange] = useState(new Date());

  const [message, setMessage] = useState("");

  const senderDate = () => {
    setMessage(value.toLocaleString());
  };
  console.log(value);
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
              onChange={onChange}
              value={value}
            />
          </div>
        </div>
      </div>

      <div className={classes.process}>
        <button className={classes.btn} onClick={senderDate}>
          Make
        </button>

        <p>{message}</p>
      </div>
      <h2 className={classes.h2}>My Reservations</h2>
      <div className={classes.footer}>
        <div className={classes.footerin}>
          <h2> MPark </h2>
          <p> Muğla/Köyceğiz </p>
          <p> 14/12/2022 Çarşamba 12:00 - 14/12/2022 Çarşamba 13:00 arasi </p>
          <p>Rezervasyon Tamamlandı</p>
          <h2> Volkan Arslan </h2>
          <p>Ücret: 20 TL </p>
        </div>
      </div>
    </>
  );
}
