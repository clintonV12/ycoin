const express = require('express');
const router = express.Router();
const uaController = require('../controller/useraccount.controller');

router.post('/', uaController.addUserAccount);
router.get('/', uaController.findUserAccounts);
router.get('/:id', uaController.findUserAccountById);
router.get('/accounts/:phone', uaController.findUserAccountByPhone);
router.put('/:id', uaController.updateUserAccount);
router.delete('/:id', uaController.deleteById);


module.exports = router;
