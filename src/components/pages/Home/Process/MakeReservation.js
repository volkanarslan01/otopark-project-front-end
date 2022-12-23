import classes from "../../Home/Home.module.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";
import DateTimePicker from "react-datetime-picker";
const MakeReservation = () => {
  const [message, setMessage] = useState("");

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [value, onChange] = useState("");
  const [value_1, onChanged] = useState("");

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [place_name, setplace] = useState("");
  const [pay, setpay] = useState(0);
  const [state, setstate] = useState(0);
  const [parkName, setparkName] = useState("");
  const [openHours, setopenHours] = useState("");

  const [item, setitem] = useState("");
  const [selected, setselected] = useState("");
  const [selected_2, setselected_2] = useState("");

  let options = [];

  const options_2 = [];

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
    data.map((data_2) => {
      if (data_2.id === 2) {
        // setitem(data_2);
        setparkName(data_2.parkName);
        setplace(data_2.place);
        setpay(data_2.hourly_pay);
        setstate(data_2.state);
        setopenHours(data_2.open_hours);
      }
    });
    userData.map((userData) => {
      setfirst_name(userData.first_name);
      setlast_name(userData.last_name);
    });
  });
  // ! data processing
  const onClick = () => {
    try {
      if (value && value_1) {
        axios.post("/lastReservations", {
          parkName: parkName,
          place: place_name,
          timeInterval: `${value.toLocaleString()} ${value_1.toLocaleString()}`,
          firstName: first_name,
          lastName: last_name,
          pay: pay,
          state: state,
        });
      }
    } catch (err) {
      setMessage(err);
    }
  };

  const defaultOption = options[0];
  const defaultOption_2 = options_2[0];

  return (
    <>
      <h4 className={classes.h4}>{message}</h4>
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
        <div className={classes.process}>
          <Dropdown
            className={classes.dropdown}
            options={options}
            onChange={selected}
            value={defaultOption}
            placeholder="Select an option"
          />
          <Dropdown
            className={classes.dropdown}
            options={options_2}
            value={defaultOption_2}
            placeholder="Select an option"
          />
        </div>
        <button className={classes.btn} onClick={onClick}>
          Make
        </button>
      </div>
    </>
  );
};
export default MakeReservation;