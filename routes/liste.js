const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('liste', { title: 'FaceCast' });
});


module.exports = router;