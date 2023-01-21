import classes from "./MakeReservation.module.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState, useEffect } from "react";
import axios from "../../../../../Api/axios";
import DateTimePicker from "react-datetime-picker";
const MakeReservation = () => {
  // ? message
  const [message, setMessage] = useState("");

  // ! date state
  const [value, onChange] = useState(new Date());
  const [value_1, onChanged] = useState(new Date());

  // ? state
  const [_first_name, setfirst_name] = useState("");
  const [_last_name, setlast_name] = useState("");
  const [_place_name, setplace] = useState("");
  const [_pay, setpay] = useState(0);
  const [_state, setstate] = useState(0);
  const [_parkName, setparkName] = useState("");
  const [_email, setemail] = useState("");
  const [openHours, setopenHours] = useState("");
  const [_kat_state, setkat_state] = useState(0);
  const [_lastState, setlastState] = useState(false);
  const [kat_name, setKat_name] = useState("");
  // ? items
  const [item, setitem] = useState([]);
  const [item_2, setitem_2] = useState([]);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  // ! controller
  const [item_controller, setitem_controller] = useState([]);
  const [parkController, setparkController] = useState([]);

  // * selected
  const [selected, setselected] = useState("");
  const [selected_2, setselected_2] = useState("");

  // ? values
  let options = [];
  let now = new Date();
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
        if (res.status === 200) {
          return setUserData(res.data);
        }
      })
      .catch((err) => {
        setMessage(err);
      });
  }, []);

  // ? data placement
  useEffect(() => {
    data.map((data_2) => {
      if (selected.value === data_2.parkName) {
        setparkName(data_2.parkName);
        setplace(data_2.place);
        setstate(data_2.state);
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

    item_2.map((item) => {
      if (selected.value === item.parkName)
        return options_2.push(item.kat_name);
    });

    item.map((item) => {
      if (selected.value === item.parkName) {
        setopenHours(item.open_hours);
        setpay(item.hourly_pay);
        setkat_state(item.kat_state);
        setKat_name(item.kat_name);
      }
    });
  });

  // ? date later update
  useEffect(() => {
    axios.get("/last").then((res) => {
      setitem_controller(res.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get("/last")
      .then((res) => {
        setparkController(res.data);
      })
      .catch((err) => {
        setMessage(err);
      });
  }, []);

  useEffect(() => {
    item_controller.forEach((item) => {
      if (item.state === 0) {
        return;
      } else if (now.getTime() > item.time_2) {
        parkController.map((kat) => {
          if (item.parkName === kat.parkName) {
            if (kat.kat_state === 0) {
              return setMessage("Park Full");
            } else {
              let state = 0;
              let kat_state = kat.kat_state++;
              axios.put("update_state", {
                parkName: item.parkName,
                state: state,
                kat_state: kat_state,
              });
            }
          }
        });
      }
    });
  });

  // ! data processing
  const onClick = () => {
    try {
      if (!_email) {
        setMessage("Please enter a user");
        return;
      } else if (value.getTime() === value_1.getTime()) {
        setMessage("Same values entered");
        return;
      } else if (
        value.getTime() > value_1.getTime() &&
        now.getTime() < value_1.getTime() &&
        now.getTime() > value.getTime()
      ) {
        setMessage("history data cannot be entered");
        return;
      }
      if (selected === "" && selected_2 === "") {
        setMessage("No operation without parking name and floor selected");
        return;
      }
      if (_kat_state === 0) {
        setMessage("Parking is now full");
        return;
      }
      // ! make reservations portion
      else if (value && value_1 && _email) {
        // ! calculator
        let result = value_1.getTime() - value.getTime();
        let pay = 0;
        function convertMstoTime(milisecond) {
          let seconds = Math.floor(milisecond / 1000);
          let minutes = Math.floor(seconds / 60);
          let hours = Math.floor(minutes / 60);
          pay = hours * _pay;
        }
        convertMstoTime(result);
        axios
          .post("/lastReservations", {
            parkName: selected.value,
            place: _place_name,
            time_1: value.getTime(),
            time_2: value_1.getTime(),
            firstName: _first_name,
            lastName: _last_name,
            pay: pay,
            state: _state,
            email: _email,
            date: now.getTime(),
          })
          .then((response) => {
            if (response) {
              if (_email) {
                const kat = _kat_state - 1;
                axios.put("/update", {
                  kat_state: kat,
                  park_name: selected.value,
                });
              }
              window.location.reload();
            }
          });
      }
    } catch (err) {
      setMessage(err);
    }
  };

  // * default options
  const defaultOption = options[0];
  const defaultOption_2 = options_2[0];

  return (
    <>
      {/* DateTime  */}
      <h4 className={classes.h4}>{message}</h4>
      <div className={classes.main}>
        <div className={classes.date_box}>
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
        </div>

        <div className={classes.drop_box}>
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
        <div className={classes.info}>
          <label> Otopark Open Hours - Hourly Pay </label>
          <p className={classes.p}>
            {openHours} - {_pay} TL
          </p>
          <label>Kat - Quato </label>
          <p>
            {kat_name} - {_kat_state === 0 ? "Full" : _kat_state}
          </p>

          {/* Make reservations */}
          <button className={classes.btn} onClick={onClick}>
            Make
          </button>
        </div>
      </div>
    </>
  );
};
export default MakeReservation;
