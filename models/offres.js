const { Long } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OffreFiguration = new Schema({
    id: Long,
    idEvenement:Long,
    eventName: String,
    eventType: String,
    roleDemande: String,
    nbFigurantDemande: Long,
    nbCandidatPostule: Long
    //TODO trouver si on a aussi besoin d'un champs qui dit si la figuration est statique ou mouvante 
    //TODO (ou si c'est inclus dans le role demandé)
});

module.exports = mongoose.model('Offre', OffreFiguration);