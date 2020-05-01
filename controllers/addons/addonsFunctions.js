const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);

exports.addIngredient = (name, type, callback) => {
    connection.connect();
    const sql = `INSERT INTO Ingredient (name, type) VALUES(?, ?)`;
    connection.query(sql, [name, type], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Ingredient Added!",
        });
    });
    connection.end();
}

exports.removeIngredient = (id, callback) => {
    connection.connect();
    const sql = `DELETE FROM Ingredient WHERE ingredient_id = ?`;
    connection.query(sql,[id], function(error,results,fields){
        if(error) callback(error);
        callback(null,{
            success:true,
            message:"Ingredient Deleted!"
        });
    });
    connection.end();
}

exports.addDecor = (name, callback)=>{
    connection.connect();
    const sql=`INSERT INTO decoration (name) VALUES (?)`;
    connection.query(sql,[name], function(error,results,fields){
        if(error) callback(error);
        callback(null,{
            success:true,
            message:"Decoration Added!"
        });
    });
    connection.end();
}

exports.removeDecor = (id, callback) => {
    connection.connect();
    const sql = `DELETE FROM decoration WHERE decoration_id = ?`;
    connection.query(sql,[id], function(error,results,fields){
        if(error) callback(error);
        callback(null,{
            success:true,
            message:"Decoration Deleted!"
        });
    });
    connection.end();
}