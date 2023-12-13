import React, { Component } from 'react';

class Chat extends Component {
  ws = null;
  state = {
    messages: [],
    newMessage: '',
  };

  initializeWebSocket(host = 'localhost', port = '3064') {

    this.ws = new WebSocket('ws://' + host + ':' + port);

    this.ws.onmessage = this.receiveMessage.bind(this);

    this.ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    }

    this.ws.onclose = (event) => {
      console.log('Disconnected from WebSocket');
    };
  }

  receiveMessage(event) {
    this.setState((state) => ({ messages: [...state.messages, event.data] }));
    console.log('Message received from server: ', event);
  }

  sendMessage(message) {
    this.ws.send(message);
    console.log('Message sent to server: ', message);
  }

  handleInputChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleSendClick() {
    this.sendMessage(this.state.newMessage);
    this.setState({ newMessage: '' });
  }

  componentDidMount() {
    this.initializeWebSocket();
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    return (
      <div>
        <h1>By Miguel Sahelices Sarmiento</h1>
        <h1>Chat messages:</h1>
        <div style={{ border: "1px solid black", padding: "1px" }}>
          {this.state.messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <textarea
          value={this.state.newMessage}
          onChange={this.handleInputChange.bind(this)}
        />
        <button onClick={this.handleSendClick.bind(this)}>Send</button>
      </div>
    );
  }
}

export default Chat;