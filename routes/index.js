var express = require('express');
var router = express.Router();
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
var pool = require('../bin/database.js')
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile','email' ]}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/login_success',
      failureRedirect: '/login' }));

router.get('/login_success', ensureAuthenticated, function(req, res){
    var id  =   req.user._json.id;
    var email  =   req.user._json.email;
    var name  =   req.user._json.name;

    //var statement = 'INSERT INTO user (email, password) VALUES("'+email+'","'+password+'");';
    //console.log('statement:'+statement);
    //client.query(statement, function (error, result, fields) {
    //    if (error) {
    //        console.log('error:'+error);
    //        response.redirect('/signup');
    //    } else {
    //        if (result) {console.log('result:'+result);}
    //        response.cookie('logined', true);
    //        response.redirect('/');
    //    }
    //});

    var statement = "IF NOT EXISTS (SELECT idUser from user where idUser = id)" +
    "INSERT INTO user (??,??,??) VALUES (? , ? , ?) ";
    var inserts = ['idUser', 'email','Name', id,email,name];

    statement = mysql.format(statement, inserts);
    console.log(statement);
    pool.getConnection(function(error, connection) {
        console.error(error);
        connection.query(statement, function (error) {
            connection.release();
            if (error) {
                console.log('error:'+error);
            }
        });

    });
   // res.render('users',)
    res.send(req.user._json);
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



function ensureAuthenticated(req, res, next) {
  // 로그인이 되어 있으면, 다음 파이프라인으로 진행
  if (req.isAuthenticated()) { return next(); }
  // 로그인이 안되어 있으면, login 페이지로 진행
  res.redirect('/');
}

module.exports = router;
