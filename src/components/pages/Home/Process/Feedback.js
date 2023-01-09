import { useState, useEffect } from "react";
import axios from "../../../../Api/axios";

import classes from "../Process/LastReservation.module.scss";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get("/users").then((res) => {
      setList(res.data);
    });
  }, []);
  useEffect(() => {
    list.map((res) => {
      setEmail(res.email);
      setName(res.first_name);
      setSurname(res.last_name);
    });
  });
  const onChangeSumbit = () => {
    if (email == "") {
      return setMessage("Please enter user");
    } else if (feedback == "") {
      return setMessage("Please enter feedback");
    } else {
      axios
        .post("/feedback", {
          name: name,
          surname: surname,
          email: email,
          feedback: feedback,
        })
        .then((res) => {
          if (res.status === 200) {
            setMessage("Thanks for the feedback");
            setTimeout(() => {
              setMessage("");
              setFeedback("");
            }, 2000);
          }
        });
    }
  };
  return (
    <div className={classes.feedBoxes}>
      <div className={classes.feedBox}>
        <h3 className={classes.title}>
          Your opinion is very important to us, so, please, tell us!
        </h3>
        <input
          value={feedback}
          type="text"
          onChange={(event) => {
            setFeedback(event.target.value);
          }}
          className={classes.feedInput}
        />
        <button className={classes.feedButton} onClick={onChangeSumbit}>
          Sumbit
        </button>
        <p className={classes.feedMessage}>{message}</p>
      </div>
    </div>
  );
};
export default Feedback;
