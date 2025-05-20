const express = require('express');
const router = express.Router();

const { login } = require('../modules/Auth/controllers/authController');

router.post('/login', login);

module.exports = router;
