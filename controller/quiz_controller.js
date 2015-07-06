var models=require('../models/models.js');
//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load=function (req,res,next,quizId) {
	models.Quiz.findById(quizId).then(
			function(quiz){
				if(quiz){
					req.quiz=quiz;
					next();
				}else{
					next(new Error('No existe quizId='+quizId));
				}
			}
		).catch(function(error){ next(error); });
};
//GET /quizes
exports.index=function(req,res){
	if(req.query.search!=null){
			console.log('Buscando el texto:'+req.query.search);
			var search=req.query.search;
			models.Quiz.findAll({where: ["pregunta like ?", "%"+search.replace(/\s/g,'%')+"%"]}).then(function(quizes){
			res.render('quizes/index.ejs',{ quizes: quizes, errors:[]});
			});
	}else{
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{ quizes: quizes, errors:[]});
	});
	
	}
};

//GET /quizes/:id
exports.show=function(req,res){
		models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz: req.quiz, errors:[]});	

	});
	
};
//GET /quizes/:id/answer
exports.answer=function(req,res){
	var resultado='Incorrecto';
		if(req.query.respuesta===req.quiz.respuesta){
		resultado='Correcto';
		}
		res.render('quizes/answer',{ quiz: req.quiz, respuesta: resultado, errors:[]});

};
//GET /quizes/new
exports.new=function(req,res){
	
	var quiz=models.Quiz.build(	//Crea objeto quiz NO persistente
			{pregunta: "Pregunta", respuesta: "Respuesta",tema: "otro"}
		);
	

	res.render('quizes/new',{quiz: quiz, errors:[]});
};

//POST /quizes/create
exports.create=function(req,res){
	var quiz=models.Quiz.build(req.body.quiz);
	//Guardar en la BD los campos pregunta y respuesta de quiz
	quiz.validate().then(function(err){
		if(err){
		res.render('quizes/new',{quiz: quiz,errors: err.errors});
		}else{
			//Guardar en la BD
		quiz.save({fields: ["pregunta","respuesta","tema"]})
		.then(function(){ res.redirect('/quizes')})		
		}
	});
};
//GET /quizes/:id/edit
exports.edit=function(req,res){
	var quiz=req.quiz; //autoload de instancia de quiz
	res.render('quizes/edit',{quiz: quiz, errors:[]});
};
//PUT /quizes/:id
exports.update=function(req,res){
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;
	req.quiz.tema=req.body.quiz.tema;
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit',{quiz: req.quiz,errors: err.errors});
			}else{
				req.quiz
				.save({fields: ["pregunta","respuesta","tema"]})
				.then( function(){ res.redirect('/quizes');});
			}
		}

		);
};
//DELETE /quizes/:id
exports.destroy=function(req,res){
	req.quiz.destroy().then(function(){
			res.redirect('/quizes');
	   }).catch(function(error){ next(error)});

};