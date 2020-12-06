const express = require('express');
const app = express();
const jose = require('node-jose');
const fs = require('fs');

const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();

const shutdownPromise = () => new Promise(function (resolve, _reject) {
    setTimeout(function () {
      console.log('DONE!');
      resolve();
    }, 10);
  });
let shutdownCheck = new health.ShutdownCheck("shutdownCheck", shutdownPromise);

healthcheck.registerShutdownCheck(shutdownCheck);
app.use('/live', health.LivenessEndpoint(healthcheck));
app.use('/ready', health.ReadinessEndpoint(healthcheck));


(async () => {
    const ks = fs.readFileSync('config/secret.json');
    const keyStore = await jose.JWK.asKeyStore(ks.toString());

    app.get('/jwks', function (req, res) {
        res.json(keyStore.toJSON());
    });
      
    app.listen(3000);
})();