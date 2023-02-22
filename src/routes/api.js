const express = require("express");
const controller = require('../controllers/ProductsController')


const router = express.Router();

router.get("/ProductList/:pageNo/:perPage/:searchKeyword",controller.ProductList);


module.exports = router;
