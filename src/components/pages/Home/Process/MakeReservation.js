import classes from "../../Home/Home.module.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";
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
  const [kat_name, setKat_name] = useState("");

  // ? items
  const [item, setitem] = useState([]);
  const [item_2, setitem_2] = useState([]);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  // ! controller
  const [item_controller, setitem_controller] = useState([]);

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
        setUserData(res.data);
      })
      .catch((err) => {
        return err;
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

  // ? update state controller

  useEffect(() => {
    axios.get("/last").then((res) => {
      setitem_controller(res.data);
    });
  }, []);

  // ? date later update
  // useEffect(() => {
  //   item_controller.map((item) => {
  //     if (now.getTime() > item.time_2) {
  //       // const kat = _kat_state + 1;
  //       const state = 0;
  //       axios.put("/state", {
  //         id: item.id,
  //         state: state,
  //         // kat: kat,
  //         parkName: item.parkName,
  //       });
  //     }
  //   });
  // });

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
        axios.post("/lastReservations", {
          parkName: selected.value,
          place: _place_name,
          time_1: value.getTime(),
          time_2: value_1.getTime(),
          firstName: _first_name,
          lastName: _last_name,
          pay: pay,
          state: _state,
          email: _email,
        });
        if (_kat_state === 0) {
          setMessage("Parking is now full");
        } else if (_email) {
          const kat = _kat_state - 1;
          axios.put("/update", {
            kat_state: kat,
            park_name: selected.value,
          });
        }
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

        {/*!! Drop Down */}
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

        <div className={classes.info}>
          <label> Otopark Open Hours - Hourly Pay </label>
          <p className={classes.p}>
            {openHours} - {_pay} TL
          </p>
          <label>Kat - Quato </label>
          <p>
            {kat_name} - {_kat_state}
          </p>
        </div>

        {/* Make reservations */}
        <button className={classes.btn} onClick={onClick}>
          Make
        </button>
      </div>
    </>
  );
};
export default MakeReservation;

// ? Projede yapilanlar
// ! Login ve Register Kısmı Tamamlandı Şifreleme Yapıldı.
// ! Login yapmadan kullanici hiçbişey yapamaz.
// ? Anasayfada ise saat ve tarih aralıklarını belirtmek için iki tane DateTimePicker ayarladım.
// * Mysql veri tabanı tasarımı yaptım ve Projemi mysql ile bağladım.
// * Mysql gelen otopark verilerine göre drop down menüleri doldurdum ve otopark açık olduğu saat ve saatlik ücretini ve anlık durumunu yazdırdım.
