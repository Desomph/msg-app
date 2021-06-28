const WebSocket = require('ws');

require('dotenv').config();

// Server configuration.
const port = process.env.SERVER_PORT || 8080;
const webSocketServer = new WebSocket.Server({
  port: port
});

// Connection listener
webSocketServer.on('connection', (websocket) => {
  websocket.send('Welcome to the messenger!');

  // Message listener
  websocket.on('message', (data) => {
    let message;

    try {
      message = JSON.parse(data);
    } catch (e) {
      sendError(websocket, 'Wrong format');

      return;
    }

    if (message.type === 'NEW_MESSAGE') {
      webSocketServer.clients.forEach((client) => {
        /// === 1 Is 'OPEN' - for some reason it's not exporting an enum.
        if (client !== websocket && client.readyState === 1) {
          client.send(data);
        }
      });
    }

  });
});

const sendError = (ws, message) => {
  const error = {
    type: 'ERROR',
    payload: message,
  };

  ws.send(JSON.stringify(error));
};