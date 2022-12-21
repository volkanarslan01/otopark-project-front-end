import { useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import Axios from "../../../Api/axios";
export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plate, setPlate] = useState("");

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
  Axios.post("/register", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    plate: plate,
    password: password,
  });
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
      onSubmit={(values) => {
        setFirstName(values.firstName);
        setLastName(values.lastName);
        setEmail(values.email);
        setPlate(values.plate);
        setPassword(values.password);
      }}
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
          </Form>
        </div>
      )}
    </Formik>
  );
}

// import { useState, useEffect } from "react";
// import Axios from "../../../Api/axios.js";
// import classes from "../Register/Register.module.scss";
// import { Formik, Form } from "formik";

// import { TextField } from "./TextField.js";
// export default function Register() {
//   const [usernameReg, setUsernameReg] = useState("");
//   const [passwordReg, setPasswordReg] = useState("");

//   const register = () => {
//     Axios.post("/register", {
//       username: usernameReg,
//       password: passwordReg,
//     }).then((response) => {
//       console.log(response);
//     });
//   };
//   return (
//     <div className="container mt-3">
//       <div className="row">
//         <div className="col-md-5">Sign up</div>
//         <div className="col-md-7">
//           <Formik
//             initialValues={{
//               fistName: "",
//               lastName: "",
//               email: "",
//               password: "",
//               confirmPassword: "",
//             }}
//           >
//             {(formik) => {
//               <div>
//                 <h1 className="my-4 font-weight-bold-display-4">
//                   {console.log(formik)}
//                 </h1>
//                 <Form>
//                   <TextField label="fistName" name="fistName" type="text" />
//                 </Form>
//               </div>;
//             }}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Formik } from "formik";
// export default function Register() {
//   const [regUsername, setRegUserName] = useState("");

//   const [regPassword, setRegPassword] = useState("");
//   // ! ???
//   //?? preventDefault normal davran button olarak aslinda sumbit olarak davraniyor
//   const handleButton = () => {
//     console.log({ regUsername, regPassword });

//     if (regUsername === "" || regPassword === "") {
//       return console.log("Kullanici adi ve sifre giriniz");
//     }

//     const data = { username: regUsername, password: regPassword };
//     try {
//       Axios.post("/register", data).then((response) => {
//         console.log(response?.data);
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       <form>
//         <label htmlFor="username">Username</label>
//         <input
//           id="username"
//           autoComplete="off"
//           type="text"
//           value={regUsername}
//           placeholder="Username"
//           onChange={(e) => setRegUserName(e.target.value)}
//         ></input>
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           autoComplete="off"
//           type="text"
//           value={regPassword}
//           placeholder="Password"
//           onChange={(e) => setRegPassword(e.target.value)}
//         ></input>
//         <br></br>
//         <button type="button" onClick={handleButton}>
//           Sumbit
//         </button>
//       </form>
//     </>
//   );
// }
