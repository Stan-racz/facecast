const { Long } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReservationOffre = new Schema({
    id:Long,
    postulantId:Long,
    idOffre:Long,
    idEvenement:Long,
});

module.exports = mongoose.model('ReservationOffre', ReservationOffre);