const { config } = require('dotenv');
const path = require('path');
const http = require('http');

config({ path: path.join(__dirname, './.config.env') });

// connect database
require('./database/connection');

const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}....`);
});
