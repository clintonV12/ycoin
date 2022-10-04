const express = require('express');
const router = express.Router();
const authRoutes = require('./authentications.route');
const uaRoutes = require('./useraccount.route');
const masterRoutes = require('./masteraccount.route');
const coRoutes = require('./cashout.route');

router.use('/remittance', coRoutes);
router.use('/auths', authRoutes);
router.use('/user-accounts', uaRoutes);
router.use('/master-accounts', masterRoutes);
module.exports = router;