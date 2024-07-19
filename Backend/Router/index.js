const express = require("express");
const router = express.Router();

const userSignUpController = require("../Controller/User/userSignUp");
const userSignInController = require("../Controller/User/userSignIn");
const AuthToken = require("../Middleware/AuthToken");
const userDetailsController = require("../Controller/User/userDetails");
const userLogout = require("../Controller/User/userLogOut");
const allUser = require("../Controller/User/allUser");
const updateUser = require("../Controller/User/updateUser");
const uploadProductController = require("../Controller/Product/uploadProduct");
const getProductController = require("../Controller/Product/getProduct");
const updateProductController = require("../Controller/Product/updateProduct");
const productCatagory = require("../Controller/Product/singleProdcutCatagory");
const catagoryWiseProduct = require("../Controller/Product/getCatagoryWiseProduct");

//user routes
router.post("/signUp", userSignUpController);
router.post("/signIn", userSignInController);
router.get("/user-details", AuthToken, userDetailsController);
router.get("/userLogout", userLogout);
router.get("/all-user", AuthToken, allUser);
router.post("/update-user", AuthToken, updateUser);

// product routes
router.post("/upload-product", AuthToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", AuthToken, updateProductController);
router.get("/get-productCatagory",productCatagory)
router.post("/catagoryWise-product",catagoryWiseProduct)
module.exports = router;
