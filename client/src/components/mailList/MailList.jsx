import "./mailList.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const MailList = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      {!user && (
        <div style={{ textAlign: "center" }}>
          <span className="mailDesc">
            Sign up and we'll send the best deals to you
          </span>
          <div className="mailInputContainer">
            <Link
              to="/Payment"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button className="chat_button">Pay</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailList;
