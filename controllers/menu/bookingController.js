const bookingFunctions = require("./bookingFunctions")

//Fazer Reserva
function newBooking(req, result) {
    //Variaveis
    let reason = req.body.reason
    let date = req.body.date
    let school = req.body.school
    let initHour = req.body.initHour
    let endHour = req.body.endHour
    let time = initHour + "-" + endHour
    let numberPeople = req.body.numberPeople
    let outfit = req.body.outfit
    let observations = req.body.observations
    let menu = req.body.menu
    let userID = req.body.userID
    let decor = req.body.decor
    let extras = req.body.extras
    let ing = req.body.ing


    bookingFunctions.addBooking(userID, menu, reason, date, time, numberPeople, school, outfit, observations, extras, decor,ing, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })
}

//Aprovar Reserva
function approved(req, result){
    let id = req.params.id

    bookingFunctions.approveBooking(id, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}

//Recusar Reserva
function refuse(req, result){
    let id = req.params.id
    let decline = req.body.decline
    bookingFunctions.refuseBooking(id, decline, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}

function giveOpinion(req, result){
    let id = req.params.id
    let opinion = req.body.opinion
    bookingFunctions.opinionBooking(id, opinion, (error, success) => {
        if (error) {
            throw error;
            return;
        }
        result.json(success)
    })

}

//Remover Reserva
function removeBooking(req, result){
    let id  = req.params.id
    bookingFunctions.removeBooking(id, (error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}


function getBookings(req, result){
    bookingFunctions.getBookings((error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}



function getMotive(req, result){
    let id  = req.params.id
    bookingFunctions.getMotive(id, (error,success)=>{
        if(error){
            throw error;
            return;
        }
        result.json(success)
    })
}

module.exports = {
    newBooking: newBooking,
    approved: approved,
    refuse: refuse,
    removeBooking: removeBooking,
    getBookings: getBookings,
    getMotive: getMotive,
    giveOpinion: giveOpinion,
    
}


