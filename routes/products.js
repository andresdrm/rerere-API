const express = require("express");
const {
    createProduct,
    product,
    userProducts,
    filterProducts,
    categoryProducts,
  } = require("../controllers/products");
  const { userIsAuthenticated } = require("../middlewares/auth");
  
const router = express.Router();

router.route("/").get(userIsAuthenticated,product);
router.route("/createProduct").post(userIsAuthenticated,createProduct);
router.route("/userProducts").post(userIsAuthenticated,userProducts);
router.route("/productList").post(userIsAuthenticated,filterProducts);
router.route("/productCategory").post(userIsAuthenticated,categoryProducts);



module.exports = router;