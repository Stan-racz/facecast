const express = require('express');
let router = express.Router();
const offres = require("../models/offres");
const { check, validationResult } = require("express-validator");
const reservationOffre = require('../models/reservationOffre');
const users = require('../models/users');
const { parseString } = require('stylus/lib/utils');
const { useColors } = require('debug/src/browser');

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'FaceCast' });
// });



router.post(
    "/connexion", [
    // Le code doit avoir au moins 2 caractères
    check("code").isLength({ min: 2 }),
],
    function (req, res) {
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
            users.find({ "reservationCode": code }, function (err, results) {
                console.log(results)
            });
            console.log("Code :" + code);
            res.redirect("/");
        }
    }
);



// Méthode pour la déconnexion
router.get('/deconnexion', function (req, res, next) {
    code = "";
    res.redirect("/");
});

/* GET home page. */
router.get('/', function (req, res, next) {
    offresFiguration = offres.find({ "vedette": true })
    resaUser = code != null ? reservationOffre.find({ "postulantId": code }) : {}
    infoUser = code != null ? users.find({ "reservationCode": code }) : {}
    Promise.all([
        offresFiguration,
        resaUser,
        infoUser
    ]).then(function ([offresFiguration, resaUser, infoUser]) {

        res.render('index', { figuration: offresFiguration, reservationsUser: resaUser, infoUser: infoUser });
    });
});

router.get('/user', function (req, res, next) {
    userCode = req.body.code;
    nom = req.body.nom;
    phoneNumber = req.body.phoneNumber;
    userSave = new User({
        name:nom,
        reservationCode:userCode,
        phoneNumber:phoneNumber,
    });
    userSave.save(userSave, (function (err) {
        if (err) {
            console.log('Erreur de sauvegarde !');
            res.redirect('/');
        } else {
            console.log("save done");
            res.redirect('/');
        }
    }));
});

//méthode de réservation d'offre
router.post("/postuler", function (req, res, next) {
    userCode = req.body.code;
    idOffre = req.body.idOffre;
    idEvenement = req.body.idEvenement;
    eventName = req.body.eventName;
    eventType = req.body.eventType;
    roleDemande = req.body.roleDemande;
    description = req.body.description;
    nbCandidatPostule = req.body.nbCandidatPostule;
    //je récupere le nb de candidats qui ont postulé, je convertis en nombre, puis je re traduis en string et j'enregistre
    nbCandidatureCalculation = parseInt(nbCandidatPostule);
    nbCandidatureCalculation = nbCandidatureCalculation + 1
    nbCandidatPostule = String(nbCandidatureCalculation);

    offreSave = new reservationOffre({
        postulantId: userCode,
        idOffre: idOffre,
        idEvenement: idEvenement,
        eventName: eventName,
        eventType: eventType,
        roleDemande: roleDemande,
        description: description,
    });
    if (typeof usercode != undefined) {
        reservationOffre.find({ "postulantId": userCode, "eventName": eventName, "roleDemande": roleDemande, "description": description }, function (err, results) {
            if (results.length == 0) {
                offres.updateOne({ "eventName": eventName, "roleDemande": roleDemande, "description": description }, { "nbCandidatPostule": nbCandidatPostule }, function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated Docs : ", docs);
                    }
                });
                offreSave.save(offreSave, (function (err) {
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