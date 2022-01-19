const express = require('express');
let router = express.Router();
const { check, validationResult } = require("express-validator");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'FaceCast' });
});



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

module.exports = router;