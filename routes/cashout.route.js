const express = require('express');
const router = express.Router();
const coController = require('../controller/cashout.controller');

router.post('/token/',coController.createAccessToken);
router.get('/reserveBalance/',coController.getReserveBalance);
router.post('/transfer/',coController.transferToUserAccount);
router.get('/validateUser/',coController.validateAccountHolder);

module.exports = router;
