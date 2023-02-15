const speedTestNet = require('speedtest-net');
const eventToPromise = require('event-to-promise');

class SpeedTest {

  async run() {
    let s = await speedTestNet({
        acceptLicense: true,
        acceptGdpr: true
    });
    return s;
/*
eventToPromise(s, 'data')
      .then(data => {
        return data;
      })
      .catch(err => {
        console.error('_speedTest:error', err);
        throw err;
      });
*/
  }
}

module.exports = SpeedTest;
