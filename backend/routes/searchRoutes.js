const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { saveSearchHistory, getSearchHistory } = require('../controllers/searchController'); // Verifica esta línea

router.post('/save', authMiddleware, saveSearchHistory);
router.get('/history', authMiddleware, getSearchHistory);

module.exports = router;
