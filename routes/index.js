const express = require('express');
const AuthRouter = require('./auth');
const ProductRouter = require('./product');
const UserRouter = require('./user');
const router = express.Router();

router.use('/api/auth', AuthRouter);
router.use('/api/product', ProductRouter);
router.use('/api/user', UserRouter);

module.exports = router;