const express = require('express');
const router = express.Router();
const tbnController = require('../controller/tbn.controller');

router.post('/token/',tbnController.createAccessToken);
//router.get('/',tbnController.findUsers);
//router.get('/:id',tbnController.findUserById);
//router.get('/all/count',tbnController.countUsers);

module.exports = router;
