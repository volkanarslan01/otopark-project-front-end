import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";

import classes from "../Process/LastReservation.module.scss";
const LastReservation = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("/last").then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <>
      {list.map((item) => {
        const {
          parkName,
          place,
          timeInterval,
          firstName,
          lastName,
          pay,
          state,
        } = item;
        return (
          <div className={classes.box}>
            <h2>{parkName}</h2>
            <label>Place</label>
            <h3>{place}</h3>
            <label>Time Interval</label>
            <h6>{timeInterval}</h6>
            <label>Name - Surname</label>
            <h2>
              {firstName} {lastName}
            </h2>
            <label>Pay</label>
            <p>{pay} TL</p>
            <label>State</label>
            <h5>{state ? "Gerçekleşiyor" : "Gerçekleşmedi"}</h5>
          </div>
        );
      })}
    </>
  );
};
export default LastReservation;
