// const dbConfig = require("../../database/db-config.json"); //Importar configuração da base de dados
const mysql = require("mysql"); //bilbioteca de mysql https://www.npmjs.com/package/mysql
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


function addAreasBooking(userID, area, reason, date, time, callback) {
    connection;
    const sql = `INSERT INTO area_Booking (user_id, area_id, reason, date, duration, state_id, decline_txt) VALUES ( ? , ?, ?, ?, ?, ?, ?)`
    connection.query(sql, [userID, area, reason, date, time, 0, ""], function (error, results) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
                success: true,
                message: "Pedido de Reserva Enviado!"
            })
            connection;
        }
    });
}


function editAreaBooking(id, state, decline, opinion, callback) {
    let sql

    connection
    if (!(state === null || state === "" || state === undefined)) {
        sql = "UPDATE area_Booking SET state_id = ? WHERE area_booking_id = ?"

        connection.query(sql, [state, id], function (error, results) {
            if (error) callback(error);
            callback(null, {
                success: true,
                message: "Reserva de Areas Atualizada",
            })
        })
    }

    if (!(decline === null || decline === "" || decline === undefined)) {
        sql = "UPDATE area_Booking SET decline_txt = ? WHERE area_booking_id = ?"

        connection.query(sql, [decline, id], function (error, results) {
            if (error) callback(error);
            callback(null, {
                success: true,
                message: "Reserva de Areas Atualizada",
            })
        })
    }

    if (!(opinion === null || opinion === "" || opinion === undefined)) {
        sql = "UPDATE area_Booking SET opinion = ? WHERE area_booking_id = ?"

        connection.query(sql, [opinion, id], function (error, results) {
            if (error) callback(error);
            callback(null, {
                success: true,
                message: "Reserva de Areas Atualizada",
            })
        })
    }


    if (state == 1) {
        aproveAreaNotification(id)
    } else if (state == 2) {
        refuseNotification(id)
    } else if (opinion !== null || opinion !== "" || opinion !== undefined) {
        opinionNotification(id)
    }
    connection
}

function aproveAreaNotification(id) {
    const sqlMenu = "Select area.name, area_Booking.user_id from area, area_Booking where  area_booking_id = ? and area.area_id = area_Booking.area_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        console.log(rows)
        if (!error) {
            let area = rows[0].name
            let user_id = rows[0].user_id
            let description = "A sua reverva da " + area + " foi aceite."
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote, [user_id, description, 0], function (error) {
                if (!error) {
                    connection
                }
            })
        }
    })
}

function refuseNotification(id) {
    const sqlMenu = "Select area.name, area_Booking.user_id from area, area_Booking where  area_booking_id = ? and area.area_id = area_Booking.area_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let area = rows[0].name
            let user_id = rows[0].user_id
            let description = "A sua reverva da " + area + " foi recusada."
            const sqlNote = `insert into notification (user_id, description, type) VALUES (?,?,?)`
            connection.query(sqlNote, [user_id, description, 0], function (error) {
                if (!error) {
                    connection
                }
            })
        }
    })
}

function opinionNotification(id) {
    const sqlMenu = "Select area.name, area_Booking.user_id from area, area_Booking where  area_booking_id = ? and area.area_id = area_Booking.area_id"
    connection.query(sqlMenu, [id], function (error, rows, fields) {
        if (!error) {
            let area = rows[0].name
            let user_id = rows[0].user_id
            let description = "Recebeu uma nova opiniao na reserva da area " + area + "."
            const sqlNote = `insert into notification (user_id, description, type) select ?, ?,? from user where user.userType_id = ?;`
            connection.query(sqlNote, [user_id, description, 0], function (error) {
                if (!error) {
                    connection
                }
            })
        }
    })
}

function removeAreaBooking(id, callback) {
    connection
    let sql = `DELETE FROM area_Booking WHERE area_booking_id = ?`;
    connection.query(sql, [id], function (err, result) {
        if (err) callback(error);
        callback(null, {
            success: true,
            message: "Reserva Removida!"
        })
    });
    connection
}

function areasBooking(callback) {
    connection
    let sql = `SELECT area_booking_id, concat(user.name," ", user.lastName) as "userName", user.email, area.name, date, duration, reason, state_booking.description FROM area_Booking inner join user on area_Booking.user_id=user.user_id inner join area on area_Booking.area_id = area.area_id inner join state_booking on area_Booking.state_id = state_booking.state_id`
    connection.query(sql, function (error, rows, fields) {
        if (error) callback(error);
        callback(null, {
            sucess: true,
            data: rows
        })
    })
}



module.exports = {
    addAreasBooking: addAreasBooking,
    removeAreaBooking: removeAreaBooking,
    areasBooking: areasBooking,
    editAreaBooking: editAreaBooking
}