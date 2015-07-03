var express = require('express');
var router = express.Router();
//Se importa el controlador al router index
var quizController=require('../controller/quiz_controller');
var authorController=require('../controller/author_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors:[] });
});
//AutoLoad de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//Definicion de rutas de /quizes
router.get('/quizes', quizController.index );
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
router.get('/author',authorController.author);
module.exports = router;
