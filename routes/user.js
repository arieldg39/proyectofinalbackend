const express = require('express');
const { decoToken, verifyJwt } = require('../middlewares/auth');
const router = express.Router();
const { addUser, authUser, sendEmailPassword, editPassword, getUsers, getUserData, updateUser } = require('./../controllers/user');
const { createUsersValidations, validateEmailUser } = require('./../middlewares/users');

router.get("/", decoToken, getUserData);
router.post("/auth", authUser);
router.patch("/update", decoToken, updateUser);
router.post('/register', createUsersValidations, addUser);
router.post('/recovery', validateEmailUser, sendEmailPassword);
router.post('/editpass', editPassword);
router.get('/all', getUsers);
router.get('/token', verifyJwt);

module.exports = router;
