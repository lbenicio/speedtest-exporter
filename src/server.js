const Koa = require('koa');
const _ = require('koa-route');
const SpeedTest = require('./speed-test');
const promFormatter = require('./prom-formatter');

const app = new Koa();

function speedText(speed) {
  let bits = speed * 8;
  const units = ['', 'K', 'M', 'G', 'T'];
  const places = [0, 1, 2, 3, 3];
  let unit = 0;
  while (bits >= 2000 && unit < 4) {
    unit++;
    bits /= 1000;
  }
  return `${bits.toFixed(places[unit])}`;
}
//let v = {};
let testResults = "";
let isRunning = 0;

async function testSpeed() {
   if (isRunning) return;
   isRunning = 1;
   let test = new SpeedTest({
//    await SpeedTest({
        acceptLicense: true,
        acceptGdpr: true
    });
    let v = await test.run();
    //console.log(v)
//      .then(v => {
        //if (v.download) {
          v.upload.bandwidth = speedText(v.upload.bandwidth)
          v.download.bandwidth = speedText(v.download.bandwidth)
          testResults += promFormatter.format(v);
          console.log('speedtest: ', {download: (v.download.bandwidth+"mbps"), upload: (v.upload.bandwidth+"mbps"), ping: v.ping.latency});
       //}
   isRunning = 0;
}

const routes = {
  metrics: async ctx => {
    console.log('/metrics');
//    let testResults;
//    testSpeed();
//    test.run();
    //console.log(v)
//      .then(v => {
//        if (v.download) {
//          v.upload.bandwidth = speedText(v.upload.bandwidth)
//          v.download.bandwidth = speedText(v.download.bandwidth)
//          testResults = promFormatter.format(testResults, v);
//          console.log('speedtest: ', {download: (v.download.bandwidth+"mbps"), upload: (v.upload.bandwidth+"mbps"), ping: v.ping.latency});
//       }
//     })
 //     .catch(e => {
 //       console.log('e', e);
 //     });
    ctx.type = 'text/plain; version=0.0.4';
    ctx.body = testResults;
    testSpeed();
  }
};

app.use(_.get('/metrics/', routes.metrics));

app.listen(9696);
