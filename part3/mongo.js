const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

mongoose.set('strictQuery', false)
// coneccion a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, 600000)
  .then(() => {
    console.log('Conectado a la DB')
  }).catch(err => {
    console.error(err)
  })

// si hay un error voy a quitar la conexion por si acaso para q no se quede zombie
process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
