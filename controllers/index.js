'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).json(123);
  console.log(123);
});

module.exports = router;
