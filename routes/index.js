var express = require('express');
var router = express.Router();
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
var pool = require('../bin/database.js')
var mysql = require('mysql');


/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
    pool.getConnection(function(error, connection) {
        console.error(error);
        connection.query("SELECT * from Circle",function (error, result) {
            connection.release();
            if (error) {
                console.log('error:' + error);
            }
            else {
                res.render('Circles', {
                    data: result
                });
            }
        });
    });
});

router.get('/login', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile','email' ]}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/login_success',
      failureRedirect: '/login' }));

router.get('/login_success', ensureAuthenticated, function(req, res){

    pool.getConnection(function(error, connection) {
        if (!error) {
            var id = req.user._json.id;
            var statement = "SELECT idUser from user WHERE idUser =" + connection.escape(id);
            connection.query(statement, function (error, result) {
                if (!error) {

                    if (result === null) {
                        var email = req.user._json.email;
                        var name = req.user._json.name;
                        statement = "INSERT INTO user (??,??,??) VALUES (? , ? , ?) ";
                        var inserts = ['idUser', 'email', 'Name', id, email, name];
                        statement = mysql.format(statement, inserts);
                        connection.query(statement, function (error) {
                            if (error) {
                                console.error(error);
                            }
                        });
                    }
                }
            });
            connection.release();
            res.redirect('/');
        }
        else {
            console.error(error);
        }
    });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/ajax/circle', ensureAuthenticated, function(req, res) {
    pool.getConnection(function(error, connection) {
        var statement =  "SELECT * from ?? WHERE  ?? = ? ";
        var inserts = ['Project', 'Circle_idCircle', req.param('id')];
        statement = mysql.format(statement, inserts);
        console.log(statement);
        connection.query(statement, function(error, result) {
            connection.release();
            if (error) {
                throw error;
            }
            if(result === null) {
                console.log("result is null");
                res.render('empty_project.ejs');
            } else {
                res.render('template_list.ejs', {
                    data: result
                });
            }

        });
    });
});

router.get('/ajax/project', ensureAuthenticated, function(req, res) {
    pool.getConnection(function(error, connection) {
        var statement =  "SELECT * from ?? WHERE  ?? = ? ";
        var inserts = ['topic', 'Project_idProject', req.param('id')];
        statement = mysql.format(statement, inserts);
        console.log(statement);
        connection.query(statement, function(error, result) {
            connection.release();
            if (error) {
                throw error;
            }
            if(result === null) {
                console.log("result is null");
                res.render('empty_project.ejs');
            } else {
                res.render('template_topic.ejs', {
                    data: result
                });
            }
        });
    });
});

router.route('/ajax/topic')
    .get(ensureAuthenticated, function(req, res) {
    pool.getConnection(function(error, connection) {
        var statement =  "SELECT * from ?? WHERE  ?? = ? ";
        var inserts = ['topic', 'Project_idProject', req.param('id')];
        statement = mysql.format(statement, inserts);
        console.log(statement);
        connection.query(statement, function(error, result) {
            connection.release();
            if (error) {
                throw error;
            }
            if(result === null) {
                console.log("result is null");
                res.render('empty_project.ejs');
            } else {
                res.render('template_topic.ejs', {
                    data: result
                });
            }
        });
    });
});



//
//
//router.get('/circle/?', ensureAuthenticated, function(req, res) {
//    pool.getConnection(function(error, connection) {
//        connection.beginTransaction(function (err) {
//            if (err) {
//                throw err;
//            }
//            connection.query('INSERT INTO posts SET title=?', title, function (err, result) {
//                if (err) {
//                    connection.rollback(function () {
//                        throw err;
//                    });
//                }
//
//                var log = 'Post ' + result.insertId + ' added';
//
//                connection.query('INSERT INTO log SET data=?', log, function (err, result) {
//                    if (err) {
//                        connection.rollback(function () {
//                            throw err;
//                        });
//                    }
//                    connection.commit(function (err) {
//                        if (err) {
//                            connection.rollback(function () {
//                                throw err;
//                            });
//                        }
//                        console.log('success!');
//                    });
//                });
//            });
//        });
//    });
//
//});

function ensureAuthenticated(req, res, next) {
  // 로그인이 되어 있으면, 다음 파이프라인으로 진행
  if (req.isAuthenticated()) { return next(); }
  // 로그인이 안되어 있으면, login 페이지로 진행
  res.redirect('/login');
}

module.exports = router;
