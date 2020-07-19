const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
dotenv.config({
  path: path.join(__dirname,'server.env');
})
const PORT = process.env.PORT || 5000;
const app = express();
app.use(helmet());
app.use(cors());





app.listen(PORT);