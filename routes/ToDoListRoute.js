const express = require('express');
const Multer = require('multer');
const Auth = require('../middlewares/auth');
const Handler = require('../utils/handler');

const router = express.Router();
router.use(Auth.user());

router.get('/',(req, res) => {
    res.render('ToDoList')
  });



module.exports = router;