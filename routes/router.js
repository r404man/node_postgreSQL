const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();

// @route GET /
// @desc Show main page with cats cards
router.get('/', controller.getAllData);


// @route GET /cats/:name
// @desc Render detail page
router.get('/cats/:id', controller.getDetailPage);

// @route GET /cat/create
// @desk Render cat create page
router.get('/cat/create', controller.createPage);

// @route POST /cat/create
// @desk Insert cat into database
router.post('/create', controller.insertCat);

module.exports = router;