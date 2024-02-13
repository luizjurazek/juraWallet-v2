const express = require('express')
const app = express()

const PORT = 3000

const { sequelize } = require('./config/connection')
const verifyJWT = require('./middlewares/auth')

app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', './views')

const routerUsers = require('./routes/routesUser')
const routerCategory = require('./routes/routesCategory')
const routerTranction = require('./routes/routesTransaction')

app.use('/users', routerUsers)
app.use('/category', verifyJWT, routerCategory)
app.use('/transaction', verifyJWT, routerTranction)


app.get('/', (req, res) => {
    res.render('pages/index')
})

async function testeSequelize () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testeSequelize()


app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: " + PORT)
})