import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./navbar.module.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle(classes["responsive_nav"]);
  };
  return (
    <header className={classes.header}>
      <nav ref={navRef} className={classes.nav}>
        <Link to="/">Home</Link>
        {!cookies.access_token ? (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <button type="button" onClick={logout}>
            logout
          </button>
        )}
        <Link to="/about">Maps</Link>

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
