import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";

import classes from "../Process/LastReservation.module.scss";

const LastReservation = () => {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const [parkList, setParkList] = useState([]);
  useEffect(() => {
    try {
      axios.get("/last").then((response) => {
        setList(response.data);
      });
    } catch (err) {
      setMessage(err);
    }
  }, []);
  useEffect(() => {
    try {
      axios.get("/lastPark").then((response) => {
        setParkList(response.data);
      });
    } catch (err) {
      setMessage(err);
    }
  }, []);

  // ! booking cancellation
  const onCancelSumbit = (id, parkName, time_2) => {
    let now = new Date();
    let time = time_2 - 3600000;
    let _kat_state;
    parkList.map((park) => {
      if (park.parkName === parkName) {
        return (_kat_state = park.kat_state + 1);
      }
    });
    try {
      if (now.getTime() > time) {
        return setMessage("There`s no cancellation in the last hour");
      }
      axios({
        method: "DELETE",
        url: "http://localhost:3004/cancel",
        data: {
          id: id,
          parkName: parkName,
          kat_state: _kat_state,
        },
      });
      window.location.reload();
    } catch (err) {
      setMessage(err);
    }
  };

  return (
    <>
      {list.map((item) => {
        const {
          id,
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

        const date = new Date(time_1);
        const date_2 = new Date(time_2);
        return (
          <div className={classes.box}>
            {message ? <h4 className={classes.h4}>{message}</h4> : null}
            <label>Park Name</label>
            <h2>{parkName}</h2>
            <label>Place</label>
            <h3>{place}</h3>
            <label>Time Interval</label>
            <h6>{date.toLocaleString() + "-" + date_2.toLocaleString()}</h6>
            <label>Name - Surname</label>
            <h2>
              {firstName} {lastName}
            </h2>
            <label>Pay</label>
            <p>{pay} TL</p>
            <label>Email</label>
            <h6>{email}</h6>
            <label>State</label>
            <h5>{state ? "Gerçekleşmedi" : "Gerçekleşti"}</h5>
            {state ? (
              <button
                onClick={() => {
                  onCancelSumbit(id, parkName, time_2);
                }}
                className={classes.btn}
              >
                Iptal
              </button>
            ) : (
              <button className={classes.btn} disabled={true}>
                Iptal
              </button>
            )}
            <hr />
          </div>
        );
      })}
    </>
  );
};
export default LastReservation;

// ? database username kismi eklenecek ve bununla reservation yapilacak.
