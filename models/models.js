var path=require('path');
//postgres DATABASE_URL=postgres://user:password@host:port/database
//SQLite DATABASE_URL=sqlite://:@:/
var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name=(url[6] || null);
var user=(url[2] || null);
var pwd=(url[3] || null);
var protocol=(url[1] || null);
var dialect=(url[1] || null);
var port=(url[5] || null);
var host=(url[4] || null);
var storage=process.env.DATABASE_STORAGE;
//Cargar Modelos ORM
var Sequelize=require('sequelize');
//Usar BD SQLite o postgres
var sequelize=new Sequelize(DB_name,user,pwd,	
	{   dialect: protocol,
		protocol: protocol, 
		port: port,
		host: host,
		storage: storage, // solo SQlite (.env)
		omitNull: true
	});
//Importamos los modelos, definicion de las tbalas quiz.js
var Quiz=sequelize.import(path.join(__dirname,'quiz'));
console.log(path.join(__dirname,'quiz'));
exports.Quiz=Quiz;//Exportar definicion de tabla Quiz
//squelize.sync() cra e inicializa tablas de la BD
sequelize.sync().then(function(){
	//success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count===0){ //la tabla se inicializa solo si esta vacia
			Quiz.create({ pregunta: 'Capital de Italia', respuesta: 'Roma'});
			Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa'}).then(function(){
				console.log('Base de datos inicializa');
			});

		};
	});
});