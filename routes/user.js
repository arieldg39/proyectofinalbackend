const express = require('express');
const { decoToken, verifyJwt } = require('../middlewares/auth');
const router = express.Router();

const { addUser, authUser, sendEmailPassword, editPassword, getUsers, getUserData, updateUser  } = require('./../controllers/user');
const { createUsersValidations, validateEmailUser } = require('./../middlewares/users');

router.get("/", getUserData);
router.post("/auth",  authUser);
router.patch("/update" ,updateUser);
router.post('/register', addUser);
router.post('/recovery', sendEmailPassword);
router.post('/editpass', editPassword);
router.get('/all', getUsers);
router.get('/token', verifyJwt);



module.exports = router;