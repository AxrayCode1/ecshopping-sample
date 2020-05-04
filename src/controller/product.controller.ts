import express = require("express");
import { logger } from '../utils/logger/logger';
import ProductService from "../service/product.service";

let productController = express.Router();

productController.get("/list", async(req, res) => {
    console.log('product list');
    res.send({msg: 'test'});
    // try {
    //     logger.info(`get request ${req}`);
    //     let allProducts = await ProductService.getAllProducts();
    //     res.json({products: allProducts});
    // } catch (error) {
    //     logger.error(error);
    //     res.sendStatus(500).json({error:"somthing went wrong."})
    // }

})

export default productController;