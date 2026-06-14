const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  savePreferences,
  generateRoadmap,
  getRoadmap,
  toggleItemStatus
} = require('../controllers/roadmapController');

// All roadmap routes are protected
router.use(protect);

router.post('/preferences', savePreferences);
router.post('/generate', generateRoadmap);
router.get('/', getRoadmap);
router.patch('/items/:itemId', toggleItemStatus);

module.exports = router;
