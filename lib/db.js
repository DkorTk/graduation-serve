const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'adopt'
});


function query (sql, data) {
    return new Promise((resolve, reject) => {
        connection.query(sql, data, function (err, ...data) {
            if (err) {
                reject(err);
            } else {
                resolve(...data);
            }
        })
    })
}

module.exports = {
    query
}