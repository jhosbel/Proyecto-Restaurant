const express = require('express');
const { searchRestaurants } = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/search', authMiddleware, searchRestaurants);

module.exports = router;