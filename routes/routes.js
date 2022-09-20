const express = require('express');
const router = express.Router();
const authRoutes = require('./authentications.route');
const coRoutes = require('./cashout.route');

router.use('/remittance', coRoutes);
router.use('/auths', authRoutes);
module.exports = router;