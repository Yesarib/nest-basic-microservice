import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    all(): Promise<import("./product.model").Product[]>;
    createProduct(product: any): Promise<void>;
    updateProduct(product: any): Promise<void>;
}
