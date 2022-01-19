const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('connexion', { title: 'FaceCast' });
});


module.exports = router;
