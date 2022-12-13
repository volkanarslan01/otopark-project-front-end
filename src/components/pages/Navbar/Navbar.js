import { useRef } from "react";
import Home from "../Home/Home.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register";
import About from "../About/About.js";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classes from "./navbar.module.scss";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(classes["responsive_nav"]);
  };

  return (
    <header className={classes.header}>
      <h3>LOGO</h3>
      <nav ref={navRef} className={classes.nav}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>

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

// function CustomLink({ to, children }) {
//   const path = window.location.pathname;
//   return (
//     <li className={path === to ? "active" : ""}>
//       <Link to={to}>{children}</Link>
//     </li>
//   );
// }
