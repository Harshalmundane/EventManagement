const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');

const {
  applyToEvent,
  getApplications,
} = require('../controllers/eventApplicationController');

router.post('/apply', auth, applyToEvent);
router.get('/application', auth, getApplications);

module.exports = router;
