const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.articles);
router.get('/:articleId', articleController.oneArticle);
router.post('/add', articleController.createArticle);
router.put('/update/:articleId', articleController.updateArticle);
router.delete('/delete/:articleId', articleController.deleteArticle);

module.exports = router;