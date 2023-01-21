import { useRef, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./navbar.module.scss";
import axios from "../../../Api/axios.js";
function Navbar() {
  const [state, setState] = useState(false);
  const [list, setList] = useState([]);
  try {
    axios
      .get("/users")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(classes["responsive_nav"]);
  };
  return (
    <header className={classes.header}>
      {list.map((item) => {
        return (
          <h6>
            {item.first_name} {item.last_name}
          </h6>
        );
      })}
      <nav ref={navRef} className={classes.nav}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">Maps</Link>
        <Link to="/reservations">Reservations</Link>
        <button
          className={`${classes["nav-btn"]} ${classes["nav-close-btn"]}`}
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button className={classes["nav-btn"]} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
