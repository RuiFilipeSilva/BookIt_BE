// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection({host:process.env.HOST,user:process.env.USER,password:process.env.PASSWORD, database:process.env.DATABASE});


//MENU
function addMenu(name, menuType, img, ing, callback) {
    connection.connect();
    const sql = `INSERT INTO menu (name, menu_type_id , img, popularity) VALUES(?,?,?,?)`;
    connection.query(sql, [name, menuType, img, 0], function (error, results, fields) {
        if (error) callback(error);
        callback(null, {
            success: true,
            message: "Menu Adicionado!"
        })
        let id = results.insertId
        newMenuNotification(id)
        menuIng(ing, id)
    });
};

function newMenuNotification(id) {
    const sqlMenu = "Select menu.name, menu_Type.description from menu, menu_Type where menu.menu_id = ? and menu.menu_type_id = menu_Type.menu_type_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let menu = rows[0].name
            let type = rows[0].description
            console.log(menu + " " + type)
            let description = "Adicionou um novo menu " + type + " " + menu + "."
            const sqlNote = `insert into notification (user_id, description, type) select user_id, ?,? from user;`
            connection.query(sqlNote, [description, 0, 0], function (error) {
                if (!error) {}
            })
        }
    })
}

function addMenuPlusType(name, newType, img, ing, callback) {
    connection.connect();
    const sql = `INSERT INTO menu_Type (description) VALUES(?)`;
    connection.query(sql, [newType], function (error, result, fields) {
        if (!error) {
            const sql2 = `INSERT INTO menu (name, menu_type_id , img, popularity) VALUES(?,?,?,?)`;
            connection.query(sql2, [name, result.insertId, img, 0], function (error, results, fields) {
                if (error) callback(error);
                callback(null, {
                    success: true,
                    message: "Menu Adicionado"
                })
                let id = results.insertId
                menuIng(ing, id)
            });
        }
    });
};

function menuIng(ing, id) {
    for (let i = 0; i < ing.length; i++) {
        const sqlIng = `INSERT INTO menu_Ingredient (menu_id, ingredient_id) VALUES ( ? , ?)`
        connection.query(sqlIng, [id, ing[i]], function (error, rows, results, fields) {
            if (i === ing.length) {
                connection.end();
            }
        });
    }
}

function removeMenu(id, callback) {
    connection.connect()
    removeMenuNotification(id)
    let sql = `DELETE FROM menu WHERE menu_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(error);
        callback(null, {
            success: true,
            message: "Menu Removido!"
        })
        connection.end()
    });
}

function removeMenuNotification(id) {
    const sqlMenu = "Select menu.name, menu_Type.description from menu, menu_Type where menu.menu_id = ? and menu.menu_type_id = menu_Type.menu_type_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let menu = rows[0].name
            let type = rows[0].description
            console.log(menu + " " + type)
            let description = "Removeu o menu " + type + " " + menu + "."
            const sqlNote = `insert into notification (user_id, description, type) select user_id, ?,? from user;`
            connection.query(sqlNote, [description, 0, 0], function (error) {
                if (!error) {}
            })
        }
    })
}

//ordenar por popularidade
function getMenus(callback) {
    connection.connect();
    const sql = `SELECT  menu_id, name,img, popularity, menu_Type.description FROM menu, menu_Type WHERE menu.menu_type_id = menu_Type.menu_type_id ;`;
    connection.query(sql, function (error, rows, results, fields) {
        if (error) {
            callback(error);
        } else {
            console.log(rows)
            callback(null, {
                success: true,
                data: rows
            })
        }
    });
    connection.end();
}

function getMenuType(callback) {
    connection.connect();
    const sql =`SELECT * FROM menu_Type;`;
    connection.query(sql, function(error,rows, results, fields){
        if(error){
            callback(error);
        }
        else{
            console.log(rows)
            callback(null,{
                success:true,
                data: rows
            })
        }
    });
    connection.end();
}

module.exports = {
    addMenu: addMenu,
    addMenuPlusType: addMenuPlusType,
    removeMenu: removeMenu,
    getMenus: getMenus,
    getMenuType: getMenuType,
}