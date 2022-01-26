const express = require('express');
let router = express.Router();
const offres = require("../models/offres");
const { check, validationResult } = require("express-validator");
const reservationOffre = require('../models/reservationOffre');
const { parseString } = require('stylus/lib/utils');

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'FaceCast' });
// });



router.post(
    "/connexion", [
        // Le code doit avoir au moins 2 caractères
        check("code").isLength({ min: 2 }),
    ],
    function(req, res) {
        // Test de validité
        const errors = validationResult(req);
        code = req.body.code;
        if (!errors.isEmpty()) {
            res.render("index", {
                title: "FaceCast",
                code: code,
                message: "Code invalide "
            });
            // console.log(code);
        } else {
            // Redirection vers index
            // console.log("Code :" + code);
            res.redirect("/");
        }
    }
);



// Méthode pour la déconnexion
router.get('/deconnexion', function(req, res, next) {
    code = "";
    res.redirect("/");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    offresFiguration = offres.find({ "vedette": true })
    resaUser = code != null ? reservationOffre.find({ "postulantId": code }) : {}
    Promise.all([
        offresFiguration,
        resaUser
    ]).then(function([offresFiguration, resaUser]) {
        res.render('index', { figuration: offresFiguration, reservationsUser: resaUser });
    });
});

//méthode de réservation d'offre
router.post("/postuler", function(req, res, next) {
    userCode = req.body.code;
    idOffre = req.body.idOffre;
    idEvenement = req.body.idEvenement;
    eventName = req.body.eventName;
    eventType = req.body.eventType;
    roleDemande = req.body.roleDemande;
    description = req.body.description;
    offreSave = new reservationOffre({
        postulantId: userCode,
        idOffre: idOffre,
        idEvenement: idEvenement,
        eventName: eventName,
        eventType: eventType,
        roleDemande: roleDemande,
        description: description,
    })
    if (typeof usercode != undefined) {
        reservationOffre.find({ "postulantId": userCode, "eventName": eventName, "roleDemande": roleDemande, "description": description }, function(err, results) {
            if (results.length == 0) {
                offreSave.save(offreSave, (function(err) {
                    if (err) {
                        console.log('Erreur de sauvegarde !');
                        res.redirect('/');
                    } else {
                        console.log("save done");
                        res.redirect('/');
                    }
                }));
            } else {
                console.log("doublon évité");
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/');
    }
    // TODO décider de ce qu'on fait après la réservation : redirection sur la page des résa user ou vers / ?
});



module.exports = router;