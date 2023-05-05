import classes from "../Login/Login.module.scss";
import { useState } from "react";
import Axios from "../../../Api/axios.js";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  const navigate = useNavigate();
  const [err, setError] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const onClick = async (values) => {
    try {
      const response = await Axios.post("/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data.msg === "Password is incorrect") {
        return setError("The combination of email and password is not correct");
      } else if (response.data.msg === "User not found") {
        return setError("The combination of email and password is not correct");
      } else if (response.data) {
        navigate("/");
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.user_ID);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
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
              {err ? <h3>{err}</h3> : null}
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
