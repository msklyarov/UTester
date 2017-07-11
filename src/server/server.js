const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('../config');
const Routes = require('./api/routes/testRoutes');
const port = config.port || 8080;

app.use(cors());
app.use(bodyParser.json());

const routes = new Routes(router);

app.use('/api', routes.getRouter());

app.listen(config.port, () => {
  console.log('Listening routes at port: %d', port);
});

