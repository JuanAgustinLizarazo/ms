const express = require('express');
const path = require('path');
const router = express.Router({
  strict: true,
  mergeParams: true,
  caseSensitive: true
});
const dataStructuresDB = require('../db/dataStructures');



module.exports = router;