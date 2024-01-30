const client_Routes = require('express').Router()
const a = require('../models/Client.model')
const sendEmail = require('../providers/EmailService')
const crypto = require("crypto")
const Token = require("../models/token")
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const bcrypt = require("bcrypt");
const clientContollers = require('../controllers/client.controllers')





client_Routes.post("/signup/",clientContollers.emailVerification )
client_Routes.get("/client/verify/:token",clientContollers.clientContollers )


module.exports = client_Routes