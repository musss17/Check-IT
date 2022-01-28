const express = require('express');
const Multer = require('multer');
const Auth = require('../middlewares/auth');
const Handler = require('../utils/handler');
//const CourseController = require('../controllers/courseController');
//const PostController = require('../controllers/postController');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 //10 MB
    }
});

const router = express.Router();
router.use(Auth.user());

router.get('/',(req, res) => {
    res.render('home')
  });



module.exports = router;