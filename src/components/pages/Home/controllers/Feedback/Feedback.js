import { useState, useEffect } from "react";
import axios from "../../../../../Api/axios";
import classes from "./FeedBack.module.scss";
const Feedback = () => {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    try {
      axios.get("/users").then((res) => {
        setList(res.data);
        console.log(res.data);
      });
    } catch (e) {
      setMessage(e);
    }
  }, []);

  const onChangeSumbit = async () => {
    if (list.email === "") {
      return setMessage("Please enter user");
    } else if (feedback === "") {
      return setMessage("Please enter feedback");
    } else {
      try {
        await axios
          .post("/feedback", {
            name: list.name,
            surname: list.surname,
            email: list.email,
            content: feedback,
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
      } catch (e) {
        setMessage(e);
      }
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
