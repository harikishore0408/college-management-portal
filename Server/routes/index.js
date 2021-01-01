const express = require('express');
const router = express.Router();

console.log('router loaded');

router.use('/student',require('./student'));
router.use('/teacher',require('./teacher'));



module.exports = router;