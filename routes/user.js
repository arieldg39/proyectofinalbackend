const express = require('express');
const router = express.Router();

const { addUser, authUser, sendEmailPassword, editPassword  } = require('./../controllers/user');
const { createUsersValidations, validateEmailUser } = require('./../middlewares/users');

router.post("/auth",  authUser);
router.post('/register', createUsersValidations, addUser);
router.post('/recovery', validateEmailUser, sendEmailPassword);
router.post('/editpass', editPassword);


module.exports = router;