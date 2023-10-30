'use strict';
const express = require('express');
const router = express.Router();

const exceptionHandler = require('../helpers/exception_handler');
const builders = require('../builders');
const services = require('../services');
const serializers = require('../serializers');

/* Add a new user */
router.post('/', (req, res) => {
  builders.user.Creator.execute(req, req.body)
    .then((data) => exceptionHandler.blankResource(data, 400, 'Create failed. Please try again'))
    .then((data) => {
      serializers.User.serialize(data).then((resp) => {
        res.status(201).json(resp);
      });
    })
    .catch((error) => exceptionHandler.error(req, res, error));
});

/* Forgot password */
router.post('/forgot-password', async (req, res) => {
  services.user.ForgotPassword.call(req.body)
    .then(() => {
      res.json({ message: 'success' });
    })
    .catch((error) => exceptionHandler.error(req, res, error));
});

/* Reset password */
router.post('/reset-password', async (req, res) => {
  services.user.ResetPassword.call(req.body)
    .then(() => {
      res.json({ message: 'success' });
    })
    .catch((error) => exceptionHandler.error(req, res, error));
});

module.exports = router;