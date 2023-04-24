import { useEffect, useState } from "react";
import axios from "../../../Api/axios";

import classes from "./user.module.scss";
import user from "../../../assets/user.gif";
import { Formik, Form } from "formik";
import { TextField } from "../Register/TextField.js";
const User = () => {
  useEffect(() => {}, []);
  const onSubmitButton = async (values) => {
    console.log(values.firstName);
    try {
      await axios.post("/user", {
        name: values.firstName,
        surname: values.lastName,
        plate: values.plate,
        email: values.email,
        password: values.password,
      });
    } catch (error) {}
  };
  return (
    <Formik
      initialValues={{
        firstName: "Volkan",
        lastName: "",
        email: "",
        plate: "",
        password: "",
      }}
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
            {/* {err ? <h4 className={classes.error}>{err}</h4> : null} */}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default User;
