import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./navbar.module.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/");
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
          <div className={classes.hide}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className={classes.visible}>
            <button
              type="button"
              style={{
                background: "#fff",
                color: "#333",
                borderRadius: "15px",
                padding: "3px",
                width: "75px",
              }}
              onClick={logout}
            >
              Logout
            </button>
            <Link to="/user">
              <FontAwesomeIcon icon={faUser} className={classes.icon} />
            </Link>
          </div>
        )}
        <Link to="/map">Maps</Link>

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
