const { Long, GridFSBucket, BSONType } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Evenement = new Schema({
    id:Number,
    name:String,
    type:String,
    imgUrl:String
});

module.exports = mongoose.model('Evenement', Evenement);