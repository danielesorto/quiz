var express = require('express');
var router = express.Router();
//Se importa el controlador al router index
var quizController=require('../controller/quiz_controller');
var authorController=require('../controller/author_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question',quizController.question);
router.get('/quizes/answer',quizController.answer);
router.get('/author',authorController.author);
module.exports = router;
