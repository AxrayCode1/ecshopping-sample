import ProductRepository from "../repository/product.repository"
import { logger } from '../utils/logger/logger';

export default class ProductService {
    public static async getAllProducts() {
        try {
            let mockProducts = await ProductRepository.listAllProducts();
            return mockProducts;
        } catch (error) {
            logger.error(error)
        }
    }
}