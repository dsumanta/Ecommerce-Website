const express = require('express')
const router = express.Router()

const userSignUpController = require('../Controller/userSignUp')
const userSignInController = require('../Controller/userSignIn')
const AuthToken = require('../Middleware/AuthToken')
const userDetailsController = require('../Controller/userDetails')
const userLogout = require('../Controller/userLogOut')
const allUser = require('../Controller/allUser')
const updateUser = require('../Controller/updateUser')


router.post('/signUp',userSignUpController)
router.post('/signIn',userSignInController)
router.get('/user-details',AuthToken,userDetailsController)
router.get('/userLogout',userLogout)
router.get('/all-user',AuthToken,allUser)
router.post('/update-user',AuthToken,updateUser)

module.exports = router
