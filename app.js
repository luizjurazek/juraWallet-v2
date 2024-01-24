const express = require('express')
const app = express()
const PORT = 3000


const verifyJWT = require('./middlewares/auth')

app.use(express.json())

const routerUsers = require('./routes/routesUser')
const routerCategory = require('./routes/routesCategory')


app.use('/users', routerUsers)
app.use('/category', routerCategory)

app.get('/', verifyJWT, (req, res) => {
    res.status(200).json({
        message: "Token funcionando"
    })
})


app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: " + PORT)
})