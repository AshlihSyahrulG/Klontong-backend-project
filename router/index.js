const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const userController = require('../controllers/userController')
// const {authentication} = require('../middleweres/authentication')


router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/', Controller.findAllProduct)


module.exports = router