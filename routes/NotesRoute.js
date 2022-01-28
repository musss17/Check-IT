const express = require('express');
const Multer = require('multer');
const Auth = require('../middlewares/auth');
const Handler = require('../utils/handler');
//const CourseController = require('../controllers/courseController');
//const PostController = require('../controllers/postController');


const router = express.Router();
router.use(Auth.user());

router.get('/',(req, res) => {
    res.render('Notes')
  });



module.exports = router;