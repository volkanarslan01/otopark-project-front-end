import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";

import classes from "../Process/LastReservation.module.scss";

const LastReservation = () => {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    try {
      axios.get("/last").then((response) => {
        setList(response.data);
      });
    } catch (err) {
      setMessage(err);
    }
  }, []);

  return (
    <>
      {list.map((item) => {
        const {
          parkName,
          place,
          time_1,
          time_2,
          firstName,
          lastName,
          pay,
          state,
          email,
        } = item;
        return (
          <div className={classes.box}>
            {message ? <h4>{message}</h4> : null}
            <h2>{parkName}</h2>
            <label>Place</label>
            <h3>{place}</h3>
            <label>Time Interval</label>
            <h6>{time_1.toLocaleString() + " " + time_2.toLocaleString()}</h6>
            <label>Name - Surname</label>
            <h2>
              {firstName} {lastName}
            </h2>
            <label>Pay</label>
            <p>{pay} TL</p>
            <label>Email</label>
            <h6>{email}</h6>
            <label>State</label>
            <h5>{state ? "Gerçekleşiyor" : "Gerçekleşmedi"}</h5>
          </div>
        );
      })}
    </>
  );
};
export default LastReservation;

// ? database username kismi eklenecek ve bununla reservation yapilacak.
