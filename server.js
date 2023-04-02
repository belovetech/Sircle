const { config } = require('dotenv');
const path = require('path');

config({ path: path.join(__dirname, './.config.env') });

// connect database
require('./database/connection');

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}....`);
});
