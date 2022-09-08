const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const jsonParse = JSON.parse(body);
    if (!jsonParse.sucess) {
      const message = `Success status was ${jsonParse.success}. Server message says: ${jsonParse.message} when fetching for IP ${jsonParse.ip}`;
      callback(Error(message), null);
      return;
    }
    const { latitude, longitude } = jsonParse;

    callback(null, {latitude, longitude});

  })
}


module.exports = { fetchMyIP, fetchCoordsByIP };