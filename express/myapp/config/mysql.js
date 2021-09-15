const mysql = require('mysql');

const con = mysql.createConnection({
    host: "103.246.18.14:8443",
    user: "pondprob_artisan",
    password: "An9i~1t3",
    database: "pondprob_artisan"
});

module.exports = {
    con,
}