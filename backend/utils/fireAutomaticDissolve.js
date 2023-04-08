const http = require('http');

const options = {
  hostname: 'http://0.0.0.0:8000/rooms/dissolve-room',
  protocol: 'http:',
  method: 'DELETE',
};

module.exports = async () => {
  const request = http.request(options, (res) => {
    const status = res.statusCode;
    if (status === 200) {
      console.log(`Room was successfully deleted ${res}`);
    } else {
      console.log('Unable to delete the room');
    }
  });

  request.on('error', (err) => {
    console.log(err);
  });
};
