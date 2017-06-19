var express = require('express'),
    router = express.Router();

const pool = require('../db.js')

router.get('/playlist', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error fetching client from pool', err);
        }
        //use the client for executing the query
        client.query('select nombre_cancion,nombre_artista,duracion from cancion,cancion_lista,lista,artista where id_lista=3 and fk_id_lista=id_lista and fk_id_cancion=id_cancion and fk_id_artista=id_artista;', function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            //done(err);
            if (err) {
                return console.error('error running query', err);
            }
            res.render('playlist', { lista: result.rows })
        });
    })
})
module.exports = router;