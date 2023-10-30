'use strict';
const express = require('express');
const router = express.Router();

const { comparePassword } = require('../utils/bcrypt');
const { verifyToken } = require('../middlewares/auth');
const exceptionHandler = require('../helpers/exception_handler');
const finders = require('../finders');
const serializers = require('../serializers');

router.get('/', verifyToken, async (req, res) => {
  serializers.Auth.serialize(req.currentUser).then((resp) => {
    res.json(resp);
  });
});

router.post('/login', async (req, res) => {
  finders.auth.UserPassword.find(scope(req, 'login'), req.body)
    .then((user) => exceptionHandler.blankResource(user, 401, 'Login is invalid. Please try again.'))
    .then(async (user) => {
      const result = await comparePassword(req.body.password, user.password);
      if (result) {
        serializers.Auth.serialize(user).then((resp) => {
          res.status(201).json(resp);
        });
      } else {
        res.status(401).json({ error: 'Login is invalid. Please try again.' });
      }
    })
    .catch((error) => exceptionHandler.error(req, res, error));
});

// PRIVATE

const scope = (_req, _action) => {
  return [];
};

module.exports = router;
