const db = require('../database/connection');

class AppController {
  static async getStatus(req, res, next) {
    if (db.isAlive()) {
      return res.status(200).send('Everything is cool!');
    }
    return res.status(500).send('Something went wrong');
  }
}

module.exports = AppController;
