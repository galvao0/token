const express = require('express')
const cors = require('cors')
const crypt = require('bcryptjs')
const db = require('./db')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    const { login, senha } = req.body

    const senhaHash = crypt.hash(senha, 10)

    const cmd = 'INSERT INTO credencial (login, senha) VALUES (?, ?)'

    db.query(cmd, [login, senhaHash])
})

app.listen(3030, () => {
    console.log('servidor rodando')
})