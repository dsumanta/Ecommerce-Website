const express = require('express')
const router = express.Router()

const userSignUpController = require('../Controller/userSignUp')
const userSignInController = require('../Controller/userSignIn')
const AuthToken = require('../Middleware/AuthToken')
const userDetailsController = require('../Controller/userDetails')
const userLogout = require('../Controller/userLogOut')

router.post('/signUp',userSignUpController)
router.post('/signIn',userSignInController)
router.get('/user-details',AuthToken,userDetailsController)
router.get('/userLogout',userLogout)

module.exports = router
