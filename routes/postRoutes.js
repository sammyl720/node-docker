const express = require('express');
const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, postController.getAllPosts);
router.get('/:id', protect, postController.getPostById);
router.post('/', protect, postController.createPost);
router.put('/:id', protect, postController.updatePost);
router.delete('/:id', protect, postController.deletePost);

module.exports = router;