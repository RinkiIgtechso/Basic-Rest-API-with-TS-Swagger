/** source/routes/posts.ts */
import express from 'express';
import controllers from "../controllers/test.controllers";
const router = express.Router();

router.get('/posts', controllers.getPosts);
router.get('/post/:id', controllers.getPost);
router.put('/post/:id', controllers.updatePost);
router.post('/posts/add', controllers.addPost);
router.delete('/posts/:id', controllers.deletePost);

export default router;