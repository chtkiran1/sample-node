const express = require('express');
const router = express.Router();

// Basic API endpoint
router.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

module.exports = router;
