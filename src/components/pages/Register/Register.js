import { useState, useEffect } from "react";
import Axios from "../../../Api/axios.js";
import classes from "../Register/Register.module.scss";
export default function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="App">
      <div className={classes.register}>
        <h1>Registiration</h1>
        <label>Username</label>
        <input type="text" onChange={(e) => setUsernameReg(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPasswordReg(e.target.value)}
        />
        <button className={classes.btn} onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

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
