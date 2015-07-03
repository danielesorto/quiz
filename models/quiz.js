//definicion del Modelo con validacion
module.exports=function(sequelize,DataTypes){
	return sequelize.define('Quiz',{
		pregunta: {
				type: DataTypes.STRING,
				validate:{notEmpty:{msg: "Pregunta es requerido"}}
				},
		respuesta: {
					type: DataTypes.STRING,
					validate: {notEmpty: {msg:"Respuesta es requerido"}}
					}
	});
}