/**
 * Created by jjungmac on 2015. 1. 5..
 */

var mysql = require('mysql');
var pool = mysql.createPool({
    user: 'root',
    password: 'tomntoms',
    database: 'QuestSystem',
    connectionLimit:20
});

module.exports = pool;