const express = require('express');
const router = express.Router();
const authRoutes = require('./authentications.route');
const uaRoutes = require('./useraccount.route');
const coRoutes = require('./cashout.route');

router.use('/remittance', coRoutes);
router.use('/auths', authRoutes);
router.use('/user-accounts', uaRoutes);
module.exports = router;