import { useState, useEffect } from "react";
import axios from "../../../Api/axios";
import classes from "./Reservations.module.scss";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Image from "../../../assets/reservations.jpg";
import {
  FaInfo,
  FaParking,
  FaMapMarkerAlt,
  FaClock,
  FaGoogle,
  FaCreditCard,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
const LastReservation = () => {
  const [message, setMessage] = useState(false);
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
  // !  otopark data get
  useEffect(() => {
    try {
      axios.get("/otopark").then((response) => {
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
      <div className={classes.main}>
        <div className={classes.header}>
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_7vph1npx.json"
            style={{ height: "300px", width: "500px" }}
          >
            <Controls />
          </Player>
          <img src={Image} className={classes.img} />
        </div>
        <div className={classes.header}></div>
        {list[0] ? (
          list.map((item) => {
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
                <div className={classes.parkName}>
                  <FaParking className={classes.faPark} size={25} />
                  <label className={classes.label}> Park Name</label>

                  <h2>{parkName}</h2>
                </div>
                <div className={classes.place}>
                  <FaMapMarkerAlt className={classes.faMap} size={25} />
                  <label className={classes.label}>Place</label>
                  <h3>{place}</h3>
                </div>

                <div className={classes.time}>
                  <FaClock className={classes.faClock} size={25} />
                  <label className={classes.label}>Time Interval</label>
                  <h6>
                    {date.toLocaleString() + "-" + date_2.toLocaleString()}
                  </h6>
                </div>

                <div className={classes.info}>
                  <FaInfo className={classes.faInfo} size={25} />
                  <label className={classes.label}>Name - Surname</label>
                  <h2>
                    {firstName} {lastName}
                  </h2>
                  <FaGoogle className={classes.faGoogle} size={25} />
                  <label className={classes.label}>Email</label>
                  <h6>{email}</h6>
                </div>
                <div className={classes.pay}>
                  <FaCreditCard className={classes.faCard} size={25} />
                  <label className={classes.label}>Pay</label>
                  <p>{pay} TL</p>
                </div>
                <div className={classes.state}>
                  <h4 className={classes.message}>{message}</h4>
                  <label className={classes.label}>State</label>
                  <h5>
                    {state ? (
                      <FaTimes className={classes.faTimes} />
                    ) : (
                      <FaCheck className={classes.FaCheck} />
                    )}
                  </h5>
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
                </div>
              </div>
            );
          })
        ) : (
          <Player
            autoplay
            loop
            src="https://assets10.lottiefiles.com/packages/lf20_afwjhfb2.json"
            style={{ height: "300px", width: "500px" }}
          >
            <Controls />
          </Player>
        )}
      </div>
    </>
  );
};
export default LastReservation;

/* 
<div className={classes.box}>
              {message ? <h4 className={classes.h4}>{message}</h4> : null}
              
              <hr />
            </div>



*/
