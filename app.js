const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const PORT = 3000

const verifyJWT = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.static('public'))
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.set('view engine', 'ejs')
app.set('views', './views')

// Rotas do app
const routerUsers = require('./routes/routesUser')
const routerCategory = require('./routes/routesCategory')
const routerTransaction = require('./routes/routesTransaction')
const routerTypeOfTransaction = require('./routes/routesTypeOfTransaction')

app.use('/users', routerUsers)
app.use('/category', verifyJWT, routerCategory)
app.use('/transaction', verifyJWT, routerTransaction)
app.use('/type-of-transaction', verifyJWT, routerTypeOfTransaction)


// errorHandler para tratar os erros das urls
app.use(errorHandler)

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: " + PORT)
})
