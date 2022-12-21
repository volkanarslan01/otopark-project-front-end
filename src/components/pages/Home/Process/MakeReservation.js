import classes from "../../Home/Home.module.scss";
import Dropdown from "react-dropdown";
import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";
const MakeReservation = () => {
  const [select, setSelect] = useState("");
  const [select_2, setSelect_2] = useState("");
  const [info, setInfo] = useState([]);
  const [info_2, setInfo_2] = useState([]);

  const options_2 = [];
  const options = [];

  useEffect(() => {
    axios.put("/update", {
      kat1: 4,
    });
  }, []);

  useEffect(() => {
    axios.get("make").then((info) => {
      setInfo(info.data);
    });
  }, []);
  useEffect(() => {
    axios.get("maked").then((info) => {
      setInfo_2(info.data);
    });
  }, []);

  info.map((value) => {
    return options.push(value.place);
  });

  info_2.map((value) => {
    return options_2.push(value.kat_name);
  });
  const defaultOption = options[0];
  const defaultOptionn = options_2[0];
  const onChanged = (value) => {
    setSelect(value);
  };
  const onChanged_2 = (value) => {
    setSelect_2(value);
  };
  return (
    <div className={classes.container}>
      <Dropdown
        options={options}
        onChange={onChanged}
        value={defaultOption}
        placeholder="Select an option"
        className={classes.drop}
      />
      <Dropdown
        options={options_2}
        onChange={onChanged_2}
        value={defaultOptionn}
        placeholder="Select an option"
        className={classes.drop_2}
      />
    </div>
  );
};
export default MakeReservation;
