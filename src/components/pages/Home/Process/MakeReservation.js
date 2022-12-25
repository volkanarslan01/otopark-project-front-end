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

  const [value, onChange] = useState(new Date());
  const [value_1, onChanged] = useState(new Date());

  const [_first_name, setfirst_name] = useState("");
  const [_last_name, setlast_name] = useState("");
  const [_place_name, setplace] = useState("");
  const [_pay, setpay] = useState(0);
  const [_state, setstate] = useState(0);
  const [_parkName, setparkName] = useState("");
  const [_email, setemail] = useState("");
  const [openHours, setopenHours] = useState("");

  const [_kat_state, setkat_state] = useState(0);
  const [item, setitem] = useState([]);
  const [item_2, setitem_2] = useState([]);
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
        setitem(res.data);
        setitem_2(res.data);
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
  }, []);

  // ? data placement
  useEffect(() => {
    data.map((data_2) => {
      if (
        selected.value === data_2.parkName &&
        selected_2.value === data_2.kat_name
      ) {
        setkat_state(data_2.kat_state);
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
      setemail(userData.email);
    });

    let arr = item.map((item) => {
      return item.parkName;
    });
    arr.forEach((item) => {
      options.push(item);
    });

    let arr_2 = item_2.map((item) => {
      if (selected.value === item.parkName) return item.kat_name;
    });
    options_2.push(arr_2);
  });

  // ? update state controller

  useEffect(() => {
    axios.get("/last").then((res) => {
      console.log(res.data);
    });
  }, []);

  // ! data processing
  const onClick = () => {
    try {
      if (value.getTime() === value_1.getTime()) {
        setMessage("Same values entered");
      }

      // ! make reservations portion
      else if (value && value_1 && _email) {
        axios.post("/lastReservations", {
          parkName: _parkName,
          place: _place_name,
          time_1: value.getTime(),
          time_2: value_1.getTime(),
          firstName: _first_name,
          lastName: _last_name,
          pay: _pay,
          state: _state,
          email: _email,
        });
      }
      if (_kat_state === 0 && _kat_state < 0) {
        setMessage("Parking is now full");
      } else {
        const kat = _kat_state - 1;
        axios.put("/update", {
          kat_state: kat,
          park_name: _parkName,
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
            onChange={setselected}
            value={defaultOption}
            placeholder="Select an Park"
          />
          <Dropdown
            className={classes.dropdown}
            onChange={setselected_2}
            options={options_2}
            value={defaultOption_2}
            placeholder="Select an Kat"
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
// ? hesaplamalari ayarla database update islemleri gibi
// ? saate gorw
