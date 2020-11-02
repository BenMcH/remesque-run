const express = require('express')
const cors = require('cors');

const {buildRouteHandler} = require('./src/loaders/index');

const app = express();

app.use(cors());

app.get('*', buildRouteHandler('./loaders'));

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})
