'use strict';
const express = require('express');
const router = express.Router();

const { comparePassword } = require('../utils/bcrypt');
const exceptionHandler = require('../helpers/exception_handler');
const finders = require('../finders');
const builders = require('../builders');

router.post('/login', async (req, res) => {
  finders.auth.UserPassword.find(scope(req, 'login'), req.body)
    .then((user) => exceptionHandler.blankResource(user, 401, 'Login is invalid. Please try again.'))
    .then(async (user) => {
      const result = await comparePassword(req.body.password, user.password);
      if (result) {
        res.status(201).json(user);
      } else {
        res.status(401).json({ error: 'Login is invalid. Please try again.' });
      }
    })
    .catch((error) => exceptionHandler.error(req, res, error));
});

/* Add a new user */
router.post('/', (req, res) => {
  builders.admin.Creator.execute(req, req.body)
    .then((data) => exceptionHandler.blankResource(data, 400, 'Create failed. Please try again'))
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => exceptionHandler.error(req, res, error));
});

// PRIVATE

const scope = (_req, _action) => {
  return [];
};

module.exports = router;
