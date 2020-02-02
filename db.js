const {database} = require('./config')
const uri = database

const mongoose = require('mongoose')
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected')
})

const playerSchema = mongoose.Schema({
  username: String,
  name: String,
  wins: Number,
  workouts: Number,
  meals: Number,
  challenge: Boolean,
  totalPoints: Number,
})
exports.Player = mongoose.model('Player', playerSchema)

