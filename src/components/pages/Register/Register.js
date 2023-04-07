import { useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import classes from "./Register.module.scss";
import Axios from "../../../Api/axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
    plate: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });
  const onSubmitButton = async (values) => {
    try {
      await Axios.post("/register", {
        name: values.firstName,
        surname: values.lastName,
        plate: values.plate,
        email: values.email,
        password: values.password,
      });
      navigate("/login");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        plate: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => onSubmitButton(values)}
    >
      {(formik) => (
        <div className="d-flex align-items-center justify-content-center w-100 m-5">
          <Form className="w-50">
            <TextField label="First Name" name="firstName" type="text" />
            <TextField label="Last Name" name="lastName" type="text" />
            <TextField label="Email" name="email" type="email" />
            <TextField label="Plate" name="plate" type="text" />
            <TextField label="Password" name="password" type="password" />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
            <button className="btn btn-dark m-3" type="submit">
              Register
            </button>
            <button className="btn btn-dark m-3" type="reset">
              Reset
            </button>
            {err ? <h4 className={classes.error}>{err}</h4> : null}
          </Form>
        </div>
      )}
    </Formik>
  );
}
