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
} from "react-icons/fa";
const Reservations = () => {
  const [getList, setList] = useState([]);
  const [getCheck, setCheck] = useState(false);

  // ? requests

  console.log(getList.find("_id"));
  useEffect(() => {
    try {
      axios
        .post("/reservations", {
          userID: window.localStorage.getItem("userID"),
        })
        .then((r) => {
          if (r.data === true) {
            try {
              axios.get("/reservations").then((r) => {
                setList(r.data);
              });
            } catch (err) {}
          }
        });
    } catch (err) {}
  }, []);

  useEffect(() => {});
  // ! UI portion

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.ui}>
          <div className={classes.box_ui}>
            <img src={r_img} alt={"Not Content"} />
          </div>
          <div className={classes.box_ui}>
            <img src={f_img} alt={"Not Content"} />
          </div>
        </div>

        {getList != [] ? (
          <>
            <div className={classes.fot_box_list}>
              <div className={classes.name}>
                <h2>{getList[7] - getList[8]}</h2>
              </div>
              <div className={classes.park}>
                <FaParking className={classes.faPark} size={25} />
                <label className={classes.label}> Park Name</label>
                <h2>{getList[1]}</h2>
              </div>
            </div>
          </>
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
    </div>
  );
};

export default Reservations;
// ? Old Code

// const Reservations = () => {
//   const [message, setMessage] = useState(false);
//   const [list, setList] = useState([]);
//   const [parkList, setParkList] = useState([]);

//   // !  otopark data get
//   useEffect(() => {
//     try {
//       axios.get("/reservations").then((response) => {
//         setList(response.data);
//       });
//     } catch (err) {
//       setMessage(err);
//     }
//   }, []);

//   // ! booking cancellation
//   const onCancelSumbit = (id, parkName, time_2) => {
//     let now = new Date();
//     let time = time_2 - 3600000;
//     let _kat_state;
//     parkList.map((park) => {
//       if (park.parkName === parkName) {
//         return (_kat_state = park.kat_state + 1);
//       }
//     });
//     try {
//       if (now.getTime() > time) {
//         return setMessage("There`s no cancellation in the last hour");
//       }
//       axios({
//         method: "DELETE",
//         url: "http://localhost:3004/cancel",
//         data: {
//           id: id,
//           parkName: parkName,
//           kat_state: _kat_state,
//         },
//       });
//       window.location.reload();
//     } catch (err) {
//       setMessage(err);
//     }
//   };

//   return (
//     <>
//       <div className={classes.main}>
//         <div className={classes.header}>
//           <Player
//             autoplay
//             loop
//             src="https://assets6.lottiefiles.com/packages/lf20_7vph1npx.json"
//             style={{ height: "300px", width: "500px" }}
//           >
//             <Controls />
//           </Player>
//           <img src={Image} className={classes.img} />
//         </div>
//         {list == [] ? (
//           list.map((item) => {
//             const {
//               _id,
//               park_name,
//               park_place,
//               block,
//               no,
//               time,
//               time_,
//               name,
//               surname,
//               pay,
//               state,
//               email,
//             } = item;
//             const date = new Date(time);
//             const date_2 = new Date(time_);

//             return (
//               <div>
//                 <h2>{park_name}</h2>
//               </div>
//               /* <div className={classes.box}>
//                 <div className={classes.parkName}>
//                   <FaParking className={classes.faPark} size={25} />
//                   <label className={classes.label}> Park Name</label>

//                   <h2>{park_name}</h2>
//                 </div>
//                 <div className={classes.place}>
//                   <FaMapMarkerAlt className={classes.faMap} size={25} />
//                   <label className={classes.label}>Place</label>
//                   <h3>{park_place}</h3>
//                 </div>

//                 <div className={classes.time}>
//                   <FaClock className={classes.faClock} size={25} />
//                   <label className={classes.label}>Time Interval</label>
//                   <h6>
//                     {date.toLocaleString() + "-" + date_2.toLocaleString()}
//                   </h6>
//                 </div>

//                 <div className={classes.info}>
//                   <FaInfo className={classes.faInfo} size={25} />
//                   <label className={classes.label}>Name - Surname</label>
//                   <h2>
//                     {name} {surname}
//                   </h2>
//                   <FaGoogle className={classes.faGoogle} size={25} />
//                   <label className={classes.label}>Email</label>
//                   <h6>{email}</h6>
//                 </div>
//                 <div className={classes.pay}>
//                   <FaCreditCard className={classes.faCard} size={25} />
//                   <label className={classes.label}>Pay</label>
//                   <p>{pay} TL</p>
//                 </div>
//                 <div className={classes.state}>
//                   <h4 className={classes.message}>{message}</h4>
//                   <label className={classes.label}>State</label>
//                   <h5>
//                     {state ? (
//                       <FaTimes className={classes.faTimes} />
//                     ) : (
//                       <FaCheck className={classes.FaCheck} />
//                     )}
//                   </h5>
//                   {state ? (
//                     <button
//                       onClick={() => {
//                         onCancelSumbit(id, parkName, time_2);
//                       }}
//                       className={classes.btn}
//                     >
//                       Iptal
//                     </button>
//                   ) : (
//                     <button className={classes.btn} disabled={true}>
//                       Iptal
//                     </button>
//                   )}
//                 </div>
//               </div> */
//             );
//           })
//         ) : (
//           <div className={classes.deserted_box}>
//             <img
//               src={Deserted}
//               className={classes.deserted}
//               alt={"non content"}
//             ></img>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// export default Reservations;
