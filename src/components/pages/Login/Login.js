import classes from "../Login/Login.module.scss";
import { useEffect, useState } from "react";
import Axios from "../../../Api/axios.js";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);
  Axios.defaults.withCredentials = true;
  const login = () => {
    Axios.post("/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };

  // useEffect(() => {
  //   Axios.get("/login").then((response) => {
  //     console.log(response);
  //   });
  // },[]);

  const userAuthenticated = () => {
    Axios.get("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };
  return (
    <>
      <div className="App">
        <div className={classes.login}>
          <h1>Login</h1>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={classes.btn} onClick={login}>
            Login
          </button>

          {loginStatus && (
            <button onClick={userAuthenticated}>Chech if Authentication</button>
          )}
        </div>
      </div>
    </>
  );
}
