import classes from "../../Home/Home.module.scss";
import Dropdown from "react-dropdown";
import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";
import DateTimePicker from "react-datetime-picker";
const MakeReservation = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [value, onChange] = useState("");
  const [value_1, onChanged] = useState("");

  const [timeInterval, setTimeInterval] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [place_name, setplace] = useState("");
  const [pay, setpay] = useState(0);
  const [state, setstate] = useState(0);
  const [parkName, setparkName] = useState("");
  const [openHours, setopenHours] = useState("");

  // ? get data
  useEffect(() => {
    axios
      .get("/otopark")
      .then((res) => {
        setData(res.data);
        return;
      })
      .catch((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        return err;
      });
  });

  // ? data placement
  useEffect(() => {
    data.forEach((data) => {
      setparkName(data.parkName);
      setplace(data.place);
      setpay(data.hourly_pay);
      setstate(data.state);
      setopenHours(data.open_hours);
    });
    userData.forEach((userData) => {
      setfirst_name(userData.first_name);
      setlast_name(userData.last_name);
    });
  });

  // ! data processing
  const onClick = () => {
    setTimeInterval(`${value.toLocaleString()} - ${value_1.toLocaleString()}`);
    axios.post("/lastReservations", {
      parkName: parkName,
      place: place_name,
      timeInterval: timeInterval,
      firstName: first_name,
      lastName: last_name,
      pay: pay,
      state: state,
    });
  };

  return (
    <>
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
        <button onClick={onClick}></button>
      </div>
    </>
  );
};
export default MakeReservation;
// const MakeReservation = () => {
//   const [select, setSelect] = useState("");
//   const [select_2, setSelect_2] = useState("");
//   const [info, setInfo] = useState([]);
//   const [info_2, setInfo_2] = useState([]);

//   const [message, setMessage] = useState([]);
//   const [number, setNumber] = useState([]);
//   const numbers = [];
//   const options_2 = [];
//   const options = [];
//   useEffect(() => {
//     axios.get("/get").then((res) => {
//       setNumber(res.data);
//     });
//   });

//   useEffect(() => {
//     axios.get("/maked").then((res) => {
//       setInfo_2(res.data);
//     });
//   }, []);
//   useEffect(() => {
//     axios.get("make").then((info) => {
//       setInfo(info.data);
//     });
//   }, []);

//   info.map((value) => {
//     return options.push(value.place);
//   });

//   info_2.map((value) => {
//     return options_2.push(value.kat_name);
//   });

//   const defaultOption = options[0];
//   const defaultOptionn = options_2[0];

//   number.map((value) => {
//     return numbers.push(value.state);
//   });

//   const onButton = () => {
//     if (numbers[0] === 0) {
//       setMessage("Yer Kalmadi");
//       return;
//     }
//     numbers[0] -= 1;
//     axios.put("/update", {
//       number: numbers[0],
//     });
//   };

//   const onChanged = (value) => {
//     setSelect(value);
//   };
//   const onChanged_2 = (value) => {
//     setSelect_2(value);
//   };
//   return (
//     <div className={classes.container}>
//       <Dropdown
//         options={options}
//         onChange={onChanged}
//         value={defaultOption}
//         placeholder="Select an option"
//         className={classes.drop}
//       />
//       <Dropdown
//         options={options_2}
//         onChange={onChanged_2}
//         value={defaultOptionn}
//         placeholder="Select an option"
//         className={classes.drop_2}
//       />

//       <div>
//         <button className={classes.btn} onClick={onButton}>
//           Make
//         </button>
//         <p>{message}</p>
//       </div>
//     </div>
//   );
// };
// export default MakeReservation;
