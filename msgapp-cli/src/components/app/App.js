import React from 'react';
import '../../resource/css/app.css';
import {Input} from 'antd';

const {Search} = Input;

// Create WebSocket connection.
const socket = new WebSocket(process.env.REACT_APP_SRV_ENDPOINT || 'ws://localhost:8080/');

const App = () => {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    // Open connection
    socket.onopen = () => {
      console.log("Connection opened.");
    };

    // Message received.
    socket.onmessage = event => {
      setMessages(oldMessages => [...oldMessages, event.data])
    };
  }, []);

  const onClick = (value) => {
    socket.send(JSON.stringify({
      "type": "NEW_MESSAGE",
      "payload": {
        "author": "Mark",
        "message": value
      }
    }));
  }

  return (
    <div className="App">
      <div>
        <Search
          placeholder="Please enter your message..."
          enterButton="Send"
          value={message}
          size="large"
          onChange={({target: value}) => setMessage(value)}
          onSearch={value => onClick(value)}
        />
      </div>
      {messages.map((msg, index) => {
        return <div key={index}>{msg}</div>
      })}
    </div>
  );
}

export default App;
