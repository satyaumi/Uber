const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");


router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must'),
    body('password').isLength({min:6}).withMessage("password must be 6 character long"),
    body('vehicle.color').isLength({min:3}).withMessage("color must be at least 3 character long"),
    body('vehicle.plate').isLength({min:3}).withMessage("plate must be at least 3 character long"),
    body('vehicle.capacity').isNumeric().withMessage("capacity must be at least 1 "),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("vehicle type must be car, motorcycle or auto"),
],
    captainController.registerCaptain
)

module.exports =router;