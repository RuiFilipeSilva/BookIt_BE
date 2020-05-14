const bookingAreasFunctions = require("./areasBookingFunctions")



//ADICIONAR FUNÇÃO DE ESTADO CONCLUÍDO 

//Fazer Reserva
function newAreaBooking(req, result) {
    //Variaveis
    let reason = req.body.reason
    let date = req.body.date
    let initHour = req.body.initHour
    let endHour = req.body.endHour
    let time = initHour + "-" + endHour
    let area = req.body.area
    let userID = req.body.userID

    bookingAreasFunctions.addAreasBooking(userID, area, reason, date, time, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

//Aprovar Reserva
function approved(req, result) {
    let id = req.params.id

    bookingAreasFunctions.approveAreaBooking(id, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}

//Recusar Reserva
function refuse(req, result) {
    let id = req.params.id
    let decline = req.body.decline
    bookingAreasFunctions.refuseAreaBooking(id, decline, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}

//Remover Reserva
function removeAreaBooking(req, result) {
    let id = req.params.id
    bookingAreasFunctions.removeAreaBooking(id, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

//Tabela das Reservas
function areasBooking(req, result) {
    bookingAreasFunctions.areasBooking((error, sucess) => {
        if (error) {
            throw error;
            return;
        }
        result.json(sucess)
    })
}

function giveOpinion(req, result) {
    let id = req.params.id
    let opinion = req.body.opinion
    bookingAreasFunctions.giveOpinion(id, opinion, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}

module.exports = {
    newAreaBooking: newAreaBooking,
    approved: approved,
    refuse: refuse,
    removeAreaBooking: removeAreaBooking,
    areasBooking: areasBooking,
    giveOpinion: giveOpinion,
}