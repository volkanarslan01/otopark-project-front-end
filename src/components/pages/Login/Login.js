import classes from "../Login/Login.module.scss";
import { useEffect, useState } from "react";
import Axios from "../../../Api/axios.js";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import { Link } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
export default function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const [err, setError] = useState("");
  const [messages, setMessages] = useState("");
  const [state, setState] = useState(false);
  const onClick = (values) => {
    try {
      Axios.post("/login", {
        email: values.email,
        password: values.password,
      })
        .then((response) => {
          if (response.data.message === "Succesful") {
            setMessages(response.data.message);
            setState(true);
          } else if (
            response.data.message === "email and password combination does not"
          ) {
            setState(false);
            setMessages(response.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
        .catch((err) => {
          if (err) {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {state ? (
        <div className={classes.home}>
          <Player
            autoplay
            loop
            src="https://assets8.lottiefiles.com/private_files/lf30_acah1toy.json"
            style={{ height: "300px", width: "500px" }}
          >
            <Controls />
          </Player>
          <Link to="/" className={classes.homeL}>
            Home
          </Link>
        </div>
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => onClick(values)}
        >
          {(formik) => (
            <div className="d-flex align-items-center justify-content-center w-100 m-5">
              <Form className="w-50">
                <TextField label="Email" name="email" type="email" />
                <TextField label="password" name="password" type="password" />
                <button className="btn btn-dark m-3" type="submit">
                  Login
                </button>
                <button className="btn btn-dark m-3" type="reset">
                  Reset
                </button>
                {err ? <h4 className={classes.error}>{err}</h4> : null}
                {messages ? (
                  <h4 className={classes.message}>{messages}</h4>
                ) : null}
              </Form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}
