import classes from "../Login/Login.module.scss";
import { useEffect, useState } from "react";
import Axios from "../../../Api/axios.js";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  Axios.defaults.withCredentials = false;
  const login = () => {
    Axios.post("/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(`Welcome ${response.data[0].username}`);
      }
    });
  };

  useEffect(() => {
    Axios.get("/login").then((response) => {
      console.log(response);
    });
  }, [loginStatus]);
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

          <h3>{loginStatus}</h3>
        </div>
      </div>
    </>
  );
}
