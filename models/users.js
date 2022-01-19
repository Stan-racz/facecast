const { Number } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    id: String,
    //TODO savoir si on a besoin du nom du candidat ou si son tel + son id ça suffit simplement
    name:String,
    reservationCode:String,
    phoneNumber:String,
});

module.exports = mongoose.model('User', User);

