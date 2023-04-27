const { config } = require('dotenv');
const path = require('path');
const { createServer } = require('http');
const socketio = require('socket.io')();
const WebSockets = require('./controllers/WebSocketController');
config({ path: path.join(__dirname, './.config.env') });

// connect database
require('./database/connection');

const app = require('./app');

const httpServer = createServer(app);
global.io = socketio.listen(httpServer);
global.io.on('connection', WebSockets.connection);

const port = process.env.PORT || 3000;
httpServer.listen(port);
httpServer.on('listening', () => {
  console.log(`Server listening on port ${port}....`);
});
