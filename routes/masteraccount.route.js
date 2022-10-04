const express = require('express');
const router = express.Router();
const masterController = require('../controller/masteraccount.controller');

router.post('/', masterController.addMasterAccount);
router.get('/', masterController.findMasterAccounts);
router.get('/:id', masterController.findMasterAccountById);
router.get('/master/:wallet_address', masterController.findMasterAccountByWalletAddress);
router.put('/:id', masterController.updateMasterAccount);
router.delete('/:id', masterController.deleteById);


module.exports = router;
