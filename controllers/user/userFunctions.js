const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config.json");
var connection = mysql.createConnection(dbConfig);



exports.login = (email, password, callback) => {

    connection.connect();
    //Get info from user
    const sql2 = `SELECT name, email, password FROM user WHERE email = ?;`
    connection.query(sql2, [email], function (error, rows, results, fields) {
        if (!error) {
            console.log(rows)
            //Verify Password
            bcrypt.compare(password, rows[0].password, function (err, res) {
                if (err) {
                    callback(err)
                }
                //Create Token
                if (res) {
                    console.log("works")
                    let token = jwt.sign({
                            email: email,
                        },
                        config.secret, {
                            expiresIn: '24h' // expires in 24 hours
                        }
                    );
                    callback(null, {
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    })
                } else {
                    console.log("Dados Invalidos")

                }
            })
        } else {
            callback(error)
        }
        connection.end();
    });
}

exports.register = (name, lastName, email, hash, number, img, userType_id, school, birthDate, callback) => {
    connection.connect();
    //Get School from mail
    const sql2 = `SELECT school_id FROM school WHERE INSTR(?, school) > 0;`
    connection.query(sql2, [email], function (error, rows, results, fields) {
        if (!error) {
            school = rows[0].school_id
            //Insert user into DB
            const sql = `INSERT INTO user (name, lastName, email, password, number, img, userType_id, school_id, birthDate) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql, [name, lastName, email, hash, number, img, userType_id, school, birthDate], function (error, results, fields) {
                if (error) callback(error);
                callback(null, {
                    success: true,
                    message: "results"
                })
            });
            connection.end();
        } else {
          callback(error)
        }
    });
}