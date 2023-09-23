'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// cau hinh doc du lieu post tu body
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  console.log(error);
});

app.use((error, req, res, next) => {
  console.log(error);
});

// start
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
