import express from 'express'
const userRoute = express.Router();

const userController = require('../controllers/userController');

module.exports = userRoute;