const express = require('express');
const app = express();
const jose = require('node-jose');
const fs = require('fs');


(async () => {
    const ks = fs.readFileSync('config/secret.json');
    const keyStore = await jose.JWK.asKeyStore(ks.toString());

    app.get('/jwks', function (req, res) {
        res.json(keyStore.toJSON());
    });
      
    app.listen(3000);
})();