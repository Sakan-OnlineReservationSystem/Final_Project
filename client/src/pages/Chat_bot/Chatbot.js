import config from "./config.js";
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./Chatbot.css";
const chatbot = () => {
  return (
    <div className="chatbotContainer">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default chatbot;
