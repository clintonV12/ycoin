const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.post('/', authController.addAuthentication);
router.post('/login', authController.login);
router.post('/logout',authController.logout);
router.get('/', authController.findAuthentications);
router.get('/:id', authController.findAuthenticationById);
router.get('/users/:id', authController.findAuthenticationByUserId);
router.put('/:id', authController.updateAuthentication);
router.delete('/:id', authController.deleteById);


module.exports = router;
