var express = require('express'),
    router = express.Router();

router.use('/user', require('./user'));
router.use('/se', require('./search'));


router.use('/home', require('./home'));

router.use('/play', require('./playlist'));

router.get('/player', function(req, res) {

    res.render('last-player');
});

router.get('/', function(req, res) {

    res.send('Happy 420!');
    console.log('well done');
});

module.exports = router;