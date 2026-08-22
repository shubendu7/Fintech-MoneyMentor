// routes/moneyHealthScore.routes.js

const express = require('express');

const router = express.Router();

const {
    generateMoneyHealthScore
} = require('../controllers/moneyHealthScore.controller');

router.post('/score', generateMoneyHealthScore);

module.exports = router;