const express = require('express');
const router = express.Router();
const { createTypes, editTypes, deleteTypes } = require('../controllers/productsType');


router.post('/add',createTypes);
router.patch('/edit/:id', editTypes);
router.delete('/delete/:id', deleteTypes);

module.exports = router;
