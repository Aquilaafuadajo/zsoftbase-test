const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'})

const app = require('./app')
const DB = process.env.DATABASE

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('DB connection successfull!'))

const port = process.env.PORT || 3001
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`)
})