if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const { DB_HOST, DB_USERNAME, DB_PW } = process.env
const uri = DB_HOST

const mongoose = require('mongoose')
mongoose.connect(uri, {
  user: DB_USERNAME, pass: DB_PW, useNewUrlParser: true, useUnifiedTopology: true
}).catch((err) => console.error(err))

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected')
})

const playerSchema = mongoose.Schema({
  userId: String,
  name: String,
  wins: Number,
  workouts: Number,
  meals: Number,
  challenge: Boolean,
  totalPoints: Number
})
exports.Player = mongoose.model('Player', playerSchema)
