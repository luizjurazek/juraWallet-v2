const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'

const endpointsFiles = ['./routes/routesCategory.js', './routes/routesTransaction.js', './routes/routesUser.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./app.js')
})