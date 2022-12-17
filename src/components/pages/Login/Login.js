import classes from "../Login/Login.module.scss";
import { useEffect, useState } from "react";
import Axios from "../../../Api/axios.js";

import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";

export default function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  Axios.post("/login", {
    email: email,
    password: password,
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        setEmail(values.email);
        setPassword(values.password);
      }}
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
          </Form>
        </div>
      )}
    </Formik>
  );
}

// ? jwt token

// const [loginStatus, setLoginStatus] = useState(false);
// Axios.defaults.withCredentials = true;
// const login = () => {
//   Axios.post("/login", {
//     username: username,
//     password: password,
//   }).then((response) => {
//     if (!response.data.auth) {
//       setLoginStatus(false);
//     } else {
//       localStorage.setItem("token", response.data.token);
//       setLoginStatus(true);
//     }
//   });
// };

// const userAuthenticated = () => {
//   Axios.get("/isUserAuth", {
//     headers: {
//       "x-access-token": localStorage.getItem("token"),
//     },
//   }).then((response) => {
//     console.log(response);
//   });
// };
