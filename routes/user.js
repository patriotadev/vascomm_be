const express = require('express');
const { createUser, updateUser, getUser, deleteUser, countUser } = require('../modules/user');
const router = express.Router();

router.get('/', getUser);
router.get('/count-user', countUser);
router.post('/', createUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;