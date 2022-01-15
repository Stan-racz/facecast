const { Long } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Evenement = new Schema({
    id:Long,
    name:String,
    type:String,
});

module.exports = mongoose.model('Evenement', Evenement);