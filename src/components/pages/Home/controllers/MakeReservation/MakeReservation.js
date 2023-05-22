import classes from "./MakeReservation.module.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useState, useEffect } from "react";
import axios from "../../../../../Api/axios";

const MakeReservation = () => {
  const [err, setError] = useState("");
  const [park, setPark] = useState([]);
  const [parks, setParks] = useState([]);
  const [kats, setKats] = useState([]);
  const [parking_space, setParkingSpace] = useState([]);
  const [check, setCheck] = useState("");
  const [selected_park, setSelected_park] = useState([]);
  const [selected_kat, setSelected_kat] = useState([]);
  const [selected_space, setSelected_space] = useState([]);
  const [selected_date1, setSelected_date1] = useState(new Date());
  const [selected_date2, setSelected_date2] = useState(new Date());

  const date_now = new Date();
  // ? park process
  useEffect(() => {
    axios.get("/park").then((res) => {
      setPark(res.data);
    });
  }, []);
  // ? Selected PROCESS
  useEffect(() => {
    const parks = park.map((park) => {
      return park.name;
    });
    setParks(parks);
  }, [park]);

  useEffect(() => {
    if (selected_park.value) {
      park.map((e) => {
        if (e.name === selected_park.value) {
          return setKats(e.kat);
        }
      });
    }
  }, [selected_park.value]);
  // * User get
  useEffect(() => {
    axios.get("/users").then((res) => {
      setCheck(res.data.email);
    });
  }, []);

  // ?
  // console.log(typeof selected_kat);
  // useEffect(() => {
  //   if (selected_kat.value) {
  //     const block = park.map((e) => {
  //       let i = 0;
  //       // if (e.block[i] === selected_kat[i]) {
  //       console.log(e.block[i]);
  //       i++;
  //       // }
  //     });
  //   }
  // }, [selected_kat.value]);

  // ! DATE PROCESS AND CHECK
  const onClick = () => {
    if (check === undefined || window.localStorage.userID === undefined)
      return setError("Please enter user");
    else if (
      selected_date1.getTime() < date_now.getTime() ||
      selected_date2.getTime() < date_now.getTime()
    ) {
      return setError("You can book at least one hour later");
    } else if (selected_date1.getTime() === selected_date2.getTime()) {
      return setError("You can make a reservation for at least one hour");
    } else if (
      selected_kat.value === undefined ||
      selected_park.value === undefined ||
      selected_space === undefined
    ) {
      return setError("Please select parking, floor and parking space");
    }
  };

  return (
    <>
      <div className={classes.datebox}>
        <DateTimePicker
          disableClock={true}
          className={classes.date}
          onChange={setSelected_date1}
          value={selected_date1}
        />
        <DateTimePicker
          disableClock={true}
          className={classes.date}
          onChange={setSelected_date2}
          value={selected_date2}
        />
      </div>

      <div className={classes.process}>
        <div className={classes.drop_box}>
          <Dropdown
            className={classes.dropdown}
            options={parks}
            onChange={setSelected_park}
            value={parks[0]}
            placeholder="Select an Park"
          />
          <Dropdown
            className={classes.dropdown}
            onChange={setSelected_kat}
            options={kats}
            value={kats[0]}
            placeholder="Select an Kat"
          />
          <Dropdown
            className={classes.dropdown}
            onChange={selected_space}
            options={parking_space}
            value={parking_space[0]}
            placeholder="Select an Parking Space"
          />
        </div>
      </div>
      <div className={classes.box_btn}>
        <button className={classes.btn} onClick={onClick}>
          Sumbit
        </button>
      </div>
      <div className={classes.error_box}>
        <h2 className={classes.err}>{err}</h2>
      </div>
      <div className={classes.main_info}>
        <div className={classes.info}>
          <p className={classes.park_pay}>Pay: 50 TL</p>
          <p className={classes.park_time}>Open/Close: 8.00 am / 18.00 pm</p>
          <p className={classes.park_place}>
            Place: Muğla/Menteşe Hacıbektaş Caddesi No: 12 Rüya Park Karşısı
          </p>
        </div>
      </div>
    </>
  );
};

//   // ? values
//   let options = [];
//   let now = new Date();
//   const options_2 = [];

//   // ? get data
//   useEffect(() => {
//     axios.get("/otopark").then((res) => {
//       setData(res.data);
//       setitem(res.data);
//       setitem_2(res.data);
//     });
//   }, []);

//   useEffect(() => {
//     axios
//       .get("/users")
//       .then((res) => {
//         if (res.status === 200) {
//           return setUserData(res.data);
//         }
//       })
//       .catch((err) => {
//         setMessage(err);
//       });
//   }, []);

//   // ? data placement
//   useEffect(() => {
//     data.map((data_2) => {
//       if (selected.value === data_2.parkName) {
//         setplace(data_2.place);
//         setstate(data_2.state);
//       }
//     });
//     userData.map((userData) => {
//       setfirst_name(userData.first_name);
//       setlast_name(userData.last_name);
//       setemail(userData.email);
//     });
//     let arr = item.map((item) => {
//       return item.parkName;
//     });
//     arr.forEach((item) => {
//       options.push(item);
//     });

//     item_2.map((item) => {
//       if (selected.value === item.parkName)
//         return options_2.push(item.kat_name);
//     });

//     item.map((item) => {
//       if (selected.value === item.parkName) {
//         setopenHours(item.open_hours);
//         setpay(item.hourly_pay);
//         setkat_state(item.kat_state);
//         setKat_name(item.kat_name);
//       }
//     });
//   });

//   // ? date later update
//   useEffect(() => {
//     axios.get("/last").then((res) => {
//       setitem_controller(res.data);
//     });
//   }, []);
//   useEffect(() => {
//     axios
//       .get("/last")
//       .then((res) => {
//         setparkController(res.data);
//       })
//       .catch((err) => {
//         setMessage(err);
//       });
//   }, []);

//   useEffect(() => {
//     item_controller.forEach((item) => {
//       if (item.state === 0) {
//         return;
//       } else if (now.getTime() > item.time_2) {
//         parkController.map((kat) => {
//           if (item.parkName === kat.parkName) {
//             if (kat.kat_state === 0) {
//               return setMessage("Park Full");
//             } else {
//               let state = 0;
//               let kat_state = kat.kat_state++;
//               axios.put("update_state", {
//                 parkName: item.parkName,
//                 state: state,
//                 kat_state: kat_state,
//               });
//             }
//           }
//         });
//       }
//     });
//   });

//   // ! data processing
//   const onClick = () => {
//     try {
//       if (!_email) {
//         setMessage("Please enter a user");
//         return;
//       } else if (value.getTime() === value_1.getTime()) {
//         setMessage("Same values entered");
//         return;
//       } else if (
//         value.getTime() > value_1.getTime() &&
//         now.getTime() < value_1.getTime() &&
//         now.getTime() > value.getTime()
//       ) {
//         setMessage("history data cannot be entered");
//         return;
//       }
//       if (selected === "" && selected_2 === "") {
//         setMessage("No operation without parking name and floor selected");
//         return;
//       }
//       if (_kat_state === 0) {
//         setMessage("Parking is now full");
//         return;
//       }
//       // ! make reservations portion
//       else if (value && value_1 && _email) {
//         // ! calculator
//         let result = value_1.getTime() - value.getTime();
//         let pay = 0;
//         function convertMstoTime(milisecond) {
//           let seconds = Math.floor(milisecond / 1000);
//           let minutes = Math.floor(seconds / 60);
//           let hours = Math.floor(minutes / 60);
//           pay = hours * _pay;
//         }
//         convertMstoTime(result);
//         axios
//           .post("/lastReservations", {
//             parkName: selected.value,
//             place: _place_name,
//             time_1: value.getTime(),
//             time_2: value_1.getTime(),
//             firstName: _first_name,
//             lastName: _last_name,
//             pay: pay,
//             state: _state,
//             email: _email,
//             date: now.getTime(),
//           })
//           .then((response) => {
//             if (response.status === 200) {
//               if (_email) {
//                 const kat = _kat_state - 1;
//                 axios.put("/update", {
//                   kat_state: kat,
//                   park_name: selected.value,
//                 });
//                 setMessage("Reservation Made");
//               }
//               setTimeout(() => {
//                 window.location.reload();
//               }, 1000);
//             }
//           });
//       }
//     } catch (err) {
//       setMessage(err);
//     }
//   };

//   // * default options
//   const defaultOption = options[0];
//   const defaultOption_2 = options_2[0];

//   return (
//     <>
//       <h3 className={classes.h3}>Booking Transactions</h3>
//       <div className={classes.main}>
//         <div className={classes.date_box}>
//           <DateTimePicker
//             disableClock={true}
//             className={classes.dateNow}
//             onChange={onChange}
//             value={value}
//           />
//           <DateTimePicker
//             disableClock={true}
//             className={classes.dateNow}
//             onChange={onChanged}
//             value={value_1}
//           />
//         </div>

//         <div className={classes.drop_box}>
//           <Dropdown
//             className={classes.dropdown}
//             options={options}
//             onChange={setselected}
//             value={defaultOption}
//             placeholder="Select an Park"
//           />
//           <Dropdown
//             className={classes.dropdown}
//             onChange={setselected_2}
//             options={options_2}
//             value={defaultOption_2}
//             placeholder="Select an Kat"
//           />
//         </div>
//         <div className={classes.info}>
//           <p className={classes.h3}>
//             <FaInfo className={classes.fa_info} /> Selected Park Info
//           </p>
//           <label> Otopark Open Hours </label>
//           <p className={classes.p}>{openHours}</p>
//           <label>Hourly Pay</label>
//           <p className={classes.p}>{_pay} TL</p>
//           <label>Kat - Quato </label>
//           <p>
//             {kat_name} - {_kat_state === 0 ? "Full" : _kat_state}
//           </p>

//           {/* Make reservations */}
//           <button className={classes.btn} onClick={onClick}>
//             Make
//           </button>

//           <h4 className={classes.message}>{message}</h4>
//         </div>
//       </div>
//     </>
//   );
// };
export default MakeReservation;
