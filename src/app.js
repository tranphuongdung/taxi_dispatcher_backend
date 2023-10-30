'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 5001;
const app = express();

// cau hinh doc du lieu post tu body
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(cors());
app.use(bodyParser.json());
app.use('/', require('./routes/indexRouter'));

// start
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
