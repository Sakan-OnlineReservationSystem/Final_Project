import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [createChatBotMessage(`Hello, how can i help you ?`)],
  botName: "Scan Bot",
};

export default config;
