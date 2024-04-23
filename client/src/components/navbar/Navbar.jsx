import "./navbar.css";
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
        {user ? (
          <div style={{ display: "flex", gap: "7px" }}>
            <Avatar rounded />
            <Dropdown label={user.user.username} inline>
              {/* <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item> */}
              <Dropdown.Item>Bookings</Dropdown.Item>
              <Dropdown.Item onClick={clearStorage}>Sign out</Dropdown.Item>
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
  );
};

export default Navbar;
