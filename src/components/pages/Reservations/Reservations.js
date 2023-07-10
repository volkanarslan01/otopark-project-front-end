import { useState, useEffect } from "react";
import axios from "../../../Api/axios";
import classes from "./Reservations.module.scss";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import r_img from "../../../assets/reservations.jpg";
import f_img from "../../../assets/fast.jpg";
import Deserted from "../../../assets/bcf43242924409.57dc9ed1841ec.gif";
import {
  FaInfo,
  FaParking,
  FaMapMarkerAlt,
  FaClock,
  FaGoogle,
  FaCreditCard,
  FaCheck,
  FaTimes,
  FaBuilding,
} from "react-icons/fa";
const Reservations = () => {
  const [message, setMessage] = useState(false);
  const [objList, setObjList] = useState([]);
  const [obj, setObj] = useState();
  let [list, setList] = useState([]);
  // !  otopark data get
  useEffect(() => {
    try {
      axios.get("/users").then((r) => {
        setObj(r.data);
      });
    } catch (e) {
      setMessage(e);
    }
  }, []);

  let reservationList = async () => {
    if (obj != undefined) {
      await axios
        .post("/reservations", {
          _email: obj.email,
        })
        .then((r) => {
          setObjList(r.data.result);
        });
    }
  };
  reservationList();
  let arr = [];
  let printObj = async () => {
    objList.map((obj) => {
      arr.push(Object.values(obj));
    });
  };

  printObj();
  // ! booking cancellation
  const onCancelSumbit = (id, parkName, time_2) => {
    let now = new Date();
    let time = time_2 - 3600000;
    let _kat_state;
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
      <div className={""}>
        <div className={classes.header}>
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_7vph1npx.json"
            style={{ height: "300px", width: "500px" }}
          >
            <Controls />
          </Player>
        </div>
        {objList[0] != undefined ? (
          arr.map((item) => {
            const date = new Date(item[5]);
            const date_ = new Date(item[6]);
            return (
              <div className={classes.box}>
                <div className={classes.parkName}>
                  <FaParking className={classes.faPark} size={25} />
                  <label className={classes.label}> Park Name</label>

                  <h2>{item[1]}</h2>
                </div>

                <div className={classes.place}>
                  <FaMapMarkerAlt className={classes.faMap} size={25} />
                  <label className={classes.label}>Place</label>
                  <h3>{item[2]}</h3>
                </div>
                <div className={classes.time}>
                  <FaClock className={classes.faClock} size={25} />
                  <label className={classes.label}>Time Interval</label>
                  <h6>
                    {date.toLocaleString() + "-" + date_.toLocaleString()}
                  </h6>
                </div>
                <div className={classes.info}>
                  <FaInfo className={classes.faInfo} size={25} />
                  <label className={classes.label}>Name - Surname</label>
                  <h2>
                    {item[7]} {item[8]}
                  </h2>
                  <FaGoogle className={classes.faGoogle} size={25} />
                  <label className={classes.label}>Email</label>
                  <h6>{item[11]}</h6>
                </div>

                <div className={classes.pay}>
                  <FaBuilding className={classes.fabuild} size={25} />
                  <label className={classes.label}>Block</label>
                  <p>{`${item[3] + " " + item[4]}`}</p>
                </div>
                <div className={classes.pay}>
                  <FaCreditCard className={classes.faCard} size={25} />
                  <label className={classes.label}>Pay</label>
                  <p>{item[9]} TL</p>
                </div>

                <div className={classes.state}>
                  <h4 className={classes.message}>{message}</h4>
                  <label className={classes.label}>State</label>
                  <h5>
                    {item[10] ? (
                      <FaTimes className={classes.faTimes} />
                    ) : (
                      <FaCheck className={classes.FaCheck} />
                    )}
                  </h5>
                </div>
              </div>
            );
          })
        ) : (
          <div className={classes.deserted_box}>
            <img
              src={Deserted}
              className={classes.deserted}
              alt={"non content"}
            ></img>
          </div>
        )}
      </div>
    </>
  );
};
export default Reservations;

/* 
                  

                  

     
                  
                 
// </div> */
