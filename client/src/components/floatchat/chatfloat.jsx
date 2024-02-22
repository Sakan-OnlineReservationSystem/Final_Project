import React, { useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import Chatbot from "../../pages/Chat_bot/Chatbot";
import "./chatfloat.css";

const Chatfloat = () => {
  const [Isopen, setIsopen] = useState(false);
  return (
    <div>
      {Isopen ? <Chatbot /> : <></>}

      <div className="chat_container">
        <button onClick={() => setIsopen(!Isopen)} className="chat_button">
          <IoIosChatboxes className="icon" />
        </button>
      </div>
    </div>
  );
};
export default Chatfloat;
