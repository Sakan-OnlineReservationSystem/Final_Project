import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">SAKAN</span>
        </Link>
        {user ? (
          <h1>{user.user.username}</h1>
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
