const express = require('express')
const app = express()
const PORT = 3000


const verifyJWT = require('./middlewares/auth')
const verifyAlreadyExistItemInBD = require('./utils/verifyAlreadyExistsItemInBD')

app.use(express.json())

const routerUsers = require('./routes/routesUser')
const routerCategory = require('./routes/routesCategory')


app.use('/users', routerUsers)
app.use('/category', verifyJWT,routerCategory)

app.get('/', verifyJWT, async (req, res) => {})

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: " + PORT)
})