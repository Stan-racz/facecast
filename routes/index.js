const express = require('express');
let router = express.Router();
const offres = require("../models/offres");
const users = require("../models/users");
const { check, validationResult } = require("express-validator");
const { db } = require('../models/users');

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
        if (!errors.isEmpty()) {
            res.render("index", {
                title: "FaceCast",
                code: code,
                message: "Code invalide "
            });
            // console.log(code);
        } else {
            // Redirection vers index
            code = req.body.code;

            db.collection('users').find({ 'reservationCode': code }).toArray(function (error, result) {
                if (error) {
                    res.send(err);
                } else {
                    if (result.length === 0) {
                        let user = new users({
                            reservationCode: code
                        });
                        user.save(function (err) {
                            if (err) {
                                console.log("Insertion non effectuée !");
                            } else {
                                console.log("Insertion effectuée !");
                            }
                        });
                    }
                    res.redirect("/");
                }
            });
        }
    });

// Méthode pour la déconnexion
router.get('/deconnexion', function (req, res, next) {
    code = "";
    res.redirect("/");
});

/* GET home page. */
router.get('/', function (req, res, next) {
    
    offres.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render("index", { title: "FaceCast", figuration: result});
        }
    });
});

//méthode de réservation d'offre
router.post("/postuler", function (req, res, next) {

});
module.exports = router;
