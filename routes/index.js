const express = require('express');
let router = express.Router();
const { check, validationResult } = require("express-validator");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'FaceCast' });
});

module.exports = router;

router.post(
    "/identification", [
        // Le pseudo doit avoir au moins 6 caractères
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