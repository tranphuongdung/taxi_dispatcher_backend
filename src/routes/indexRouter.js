'use strict';
const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth');
router.use('/auth', auth);

const user = require('../controllers/user');
router.use('/user', user);

module.exports = router;
