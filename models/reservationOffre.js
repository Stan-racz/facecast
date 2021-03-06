const { Number } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationOffre = new Schema({
    id:String,
    postulantId:String,
    eventName: String,
    eventType: String,
    roleDemande: String,
    description:String,
    idOffre:String,
    idEvenement:String,
});

module.exports = mongoose.model('ReservationOffre', ReservationOffre);