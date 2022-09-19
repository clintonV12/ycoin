const express = require('express');
const router = express.Router();
const tbnRoutes = require('./tbn.route');

router.use('/remittance', tbnRoutes);
module.exports = router;