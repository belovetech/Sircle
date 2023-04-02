const db = require('../database/connection');

module.exports = (req, res, next) => {
  if (db.isAlive()) {
    return res.status(200).send('Everything is cool!');
  }
  return res.status(500).send('Something went wrong');
};
