const express = require('express');
const router = express.Router();
const { createTypes, editTypes, deleteTypes } = require('../controllers/ProductsType');


router.post('/',createTypes);
router.patch('/:id', editTypes);
router.delete('/:id', deleteTypes);

module.exports = router;
