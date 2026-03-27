const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'auth_db',
    password: 'alunolab',
    port: 3303,
    user: 'root'
})

conn.connect((err) => {
    if(!err) {
        console.log('conectado ao db')
        return
    }
    console.log(err)
})

module.exports = conn