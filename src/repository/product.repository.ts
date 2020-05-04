import { logger } from '../utils/logger/logger';

class Product{
    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }
    id:string;
    name:string;
    unit?:string;
}

export default class ProductRepository {
    public static async listAllProducts(){
        return new Promise((resolve, reject) => {
            let product = new Product("1", "apple");
            let mockProducts = [product];
            resolve(mockProducts);
        })
    }
}