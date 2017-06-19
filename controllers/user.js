// var pg = require('pg').native
// var Pool = require('pg').Pool // bad! this is not bound to the native client 
// var Client = require('pg').Client // bad! this is the pure JavaScript client 

// var pg = require('pg').native
// var Pool = pg.Pool // good! a pool bound to the native client 
// var Client = pg.Client // good! this client uses libpq bindings 

var express = require('express'),
    router = express.Router();

const pool = require('../db.js');
var User, Pass;



//to run a query we just pass it to the pool 
//after we're done nothing has to be taken care of 
//we don't have to return any client to the pool or close a connection 


router.get('/all_users', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('Error fetching client from pool', err);
        }
        //use the client for executing the query
        client.query('SELECT * FROM usuario', function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            //done(err);

            if (err) {
                return console.error('error running query', err);
            }
            //res.send(JSON.stringify(result.rows));
            res.render('user', { usuarios: result.rows });
            //output: 1
            done();
        });
    });
});



router.get('/login', function(req, res) {
    res.render('login');
});


router.post('/login', function(req, res) {
    var user = req.body.email;
    var pass = req.body.password;
    console.log(req.body);

    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }

        //use the client for executing the 

        client.query("SELECT * FROM usuario where nombre_usuario='" + user + "' and password='" + pass + "'", function(err, result) {
            //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result.rows);
            if (result.rows.length <= 0) {
                console.log("Username or Password Incorrect /n Please Try Again");
            } else {
                res.render('user', { usuarios: result.rows });

            }
        });
    });
});

router.post('/add', function(req, res) {
    console.log('hello')
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        //use the client for executing the query
        client.query("INSERT INTO usuario(nombre_usuario,password) VALUES($1,$2)", [req.body.user, req.body.password]);
        done();
        res.redirect('/user/all_users');
    });
});

router.post('/delete', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        //use the client for executing the query
        client.query('DELETE FROM usuario WHERE id_usuario=($1)', [req.body.id_usuario]);
        done();
        res.redirect('/user/all_users');
    });
});

module.exports = router;