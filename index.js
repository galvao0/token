const express = require('express')
const cors = require('cors')
const crypt = require('bcryptjs')
const db = require('./db')
const jwt = require('jsonwebtoken')

const authMiddleware = require('./authMiddleware')
const SECRET = "segredo"

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    const { login, senha } = req.body

    const senhaHash = crypt.hash(senha, 10)

    const cmd = 'INSERT INTO credencial (login, senha) VALUES (?, ?)'

    db.query(cmd, [login, senhaHash], (err, result) => {
        if(err) {
            return res.json({ msg: 'erro ao inserir' })
        }
        res.json({ msg: 'inserido' })
    })
})

app.post('/login', async (req, res) => {
    try {
        const { login, senha } = req.body
        const searchUser = db.query('SELECT * FROM credencial WHERE login = ?', login)
        if (!searchUser) {
            return res.json({ error: 'usuario nao encontardo' })
        }
        const verifPass = crypt.compare(senha, searchUser.senha)
        if(!verifPass) {
            return res.status(400).json({ error: 'senha inválida' })
        }
        const token = jwt.sign(
            {
                id: user.id,
                login: user.login
            },
            SECRET,
            {
                expiresIn: "1h"
            }
        )
        res.json({ token: token })
    } catch (err) {
        res.json({ error: err })
    }
})

app.get('/admin', authMiddleware, (req, res) => {
    res.json({
        msg: 'bem-vindo, admin',
        user: req.user
    })
})

app.listen(3030, () => {
    console.log('servidor rodando')
})