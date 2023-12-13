import React, { Component } from 'react';

class Chat extends Component {
  state = {
    messages: [],
    newMessage: '',
    server: 'localhost',
    port: '3064',
  };

  ws = null;

  initializeWebSocket() {

    const { server, port } = this.state;

    this.ws = new WebSocket(`ws://${server}:${port}`);
    this.ws.onmessage = this.receiveMessage.bind(this);

    this.ws.onopen = () => console.log('Connected to WebSocket');
    this.ws.onclose = () => console.log('Disconnected from WebSocket');
    this.ws.onerror = (event) => console.error('WebSocket error:', event);
  }

  receiveMessage(event) {
    this.setState((prevState) => ({
      messages: [...prevState.messages, event.data],
    }));
    console.log('Message received from server:', event);
  }

  sendMessage(message) {
    this.ws.send(message);
    console.log('Message sent to server:', message);
  }

  handleInputChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleSendClick() {
    const { newMessage } = this.state;
    this.sendMessage(newMessage);
    this.setState({ newMessage: '' });
  }

  componentDidMount() {
    this.initializeWebSocket();
  }

  componentWillUnmount() {
    this.ws.close();
  }

  changeServer() {
    this.ws.close();
    this.setState({ messages: [] });
    const server = document.getElementById('server').value;
    const port = document.getElementById('port').value;
    if (!server || !port) {
      this.initializeWebSocket();
    } else {
      this.setState({ server, port }, () => {
        this.initializeWebSocket();
      });
    }
  }

  render() {
    const { messages, newMessage, server, port } = this.state;
    return (
      <div>
        <h1>By Miguel Sahelices Sarmiento</h1>
        <h1>Chat messages:</h1>
        <div style={{ border: '1px solid black', padding: '1px' }}>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <h1>Send a message:</h1>
        <table>
          <tbody>
            <tr>
              <td>Message:</td>
              <td>
                <textarea value={newMessage} onChange={this.handleInputChange.bind(this)} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit" onClick={this.handleSendClick.bind(this)} style={{ width: '100%' }}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="text" placeholder="localhost" id="server" defaultValue={server} />
        <input type="text" placeholder="3064" id="port" defaultValue={port} />
        <button onClick={this.changeServer.bind(this)}>Change Server</button>
      </div>
    );
  }
}

export default Chat;