import { useEffect, useState } from "react";
import axios from "../../../Api/axios";
import classes from "./user.module.scss";
import * as Yup from "yup";
import userG from "../../../assets/user.gif";
import { Formik, Form } from "formik";
import { TextField } from "../Register/TextField.js";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const User = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [users, setUsers] = useState([]);
  const [err, setErrors] = useState("");
  const [valid, setValid] = useState("");
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
  useEffect(() => {
    axios.get("/users").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  const onSubmitButton = async (values) => {
    try {
      if (valid) {
        await axios
          .put("/update", {
            name: values.firstName,
            surname: values.lastName,
            plate: values.plate,
            email: values.email,
            password: values.password,
            _id: valid,
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setErrors(response.data.msg);
              logout();
            }
          });
      }
    } catch (err) {
      setErrors(err);
    }
  };
  const onChangedValue = (e) => {
    try {
      axios
        .post("/validate", {
          email: users.email,
          password: e,
        })
        .then((res) => {
          setErrors(res.data.msg);
          setValid(res.data);
        });
    } catch (e) {
      setErrors(e);
    }
  };
  return !users.email == "" ? (
    <Formik
      validationSchema={validate}
      initialValues={{
        firstName: users.name,
        lastName: users.surname,
        email: users.email,
        plate: users.plate,
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
            <TextField
              label="Old Password"
              name="oldpassword"
              type="password"
              onChange={(e) => onChangedValue(e.target.value)}
            />
            {err ? <h4 className={classes.error}>{err}</h4> : null}

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
          </Form>

          <div className={classes.img_box}>
            <img className={classes.img} src={userG} alt={"I dont image"} />
          </div>
        </div>
      )}
    </Formik>
  ) : (
    <img src={userG} alt={"I dont image"} />
  );
};

export default User;
