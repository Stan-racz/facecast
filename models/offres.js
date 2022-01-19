const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OffreFiguration = new Schema({
    id:String,
    idEvenement:String,
    eventName: String,
    eventType: String,
    roleDemande: String,
    nbFigurantDemande: String,
    nbCandidatPostule: String,
    description:String,
    vedette:String
    //TODO trouver si on a aussi besoin d'un champs qui dit si la figuration est statique ou mouvante 
    //TODO (ou si c'est inclus dans le role demandé)
});

module.exports = mongoose.model('Offre', OffreFiguration);