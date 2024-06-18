import "./navbar.css";
import {
  faSuitcase,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Dropdown } from "flowbite-react";
import { Avatar } from "flowbite-react";

import "../../output.css";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const clearStorage = () => {
    sessionStorage.clear();
    window.location.reload(false);
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">SAKAN</span>
        </Link>
        <div className="rightContainer">
          <Link to={true ? "/listProperty" : "/login"}>
            <div className="listProperty">List your property </div>
          </Link>
          {user ? (
            <div style={{ display: "flex", gap: "7px" }}>
              <Avatar rounded />
              <Dropdown className="dropdown" label={user.user.username} inline>
                <Link className="NavDropdown" to={"/Bookings"}>
                  <FontAwesomeIcon icon={faSuitcase} />
                  <Dropdown.Item>Bookings</Dropdown.Item>
                </Link>
                <div className="NavDropdown">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <Dropdown.Item onClick={clearStorage}>Sign out</Dropdown.Item>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="navItems">
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className="headerBtn">Sign in / Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
