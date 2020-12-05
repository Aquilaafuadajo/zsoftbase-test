const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');


const app = express()
app.use(cors())
app.options('*', cors())

app.use(express.json());

app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

module.exports = app