/**
 * Created by jjungmac on 2015. 1. 5..
 */

var mysql = require('mysql');
var pool = mysql.createPool({
    user: 'ourUser',
    password: 'tomntoms',
    database: 'QuestionSystem',
    connectionLimit:20
});

module.exports = pool;