# msg-app

A simple multi-user messenger application, written in nodejs + react.

To run backend, navigate to `msgapp-srv` and run `node index.js`

To run frontend, navigate to `msgapp-cli` and run `yarn start` or `npm start`.

The easiest way to test the application is to open several browsers in parallel and try sending the messages.
Application expects `.env` files in roots of both projects (`msgapp-cli/.env` and `msgapp-srv/.env`), if it does not find them - it will use hardcoded default values.