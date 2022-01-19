const express = require('express');
let router = express.Router();
const offres = require("../models/offres");

/* GET home page. */
router.get('/', function(req, res, next) {
    offres.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render("liste", { title: "FaceCast", figuration: result });
        }
    });
});


module.exports = router;