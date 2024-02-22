class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    this.actionProvider.greet(message);
  }
}

export default MessageParser;
