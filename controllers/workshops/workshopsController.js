const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection(dbConfig);
const workshopFunctions = require("./workshopsFunctions")

//Adicionar Workshop
function addWorkshop(req, result) {
    let name = req.body.name;
    let teacher = req.body.teacher;
    let date = req.body.date;
    let description = req.body.description;
    let hi = req.body.hi; //Hora inicio
    let hf = req.body.hf; //Hora final
    let time = hi + "-" + hf
    let vacancies = req.body.vacancies;
    let img = "";

    workshopFunctions.addWorkshop(name, date, teacher, description, img, vacancies, time, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

//Eliminar Workshop
function removeWorkshop(req, result) {
    let id = req.body.id;

    workshopFunctions.removeWorkshop(id, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    addWorkshop: addWorkshop,
    removeWorkshop: removeWorkshop
}