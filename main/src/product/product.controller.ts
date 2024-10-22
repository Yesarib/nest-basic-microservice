import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {

    }

    @Get()
    async all() {
        return this.productService.all();
    }

    @EventPattern('product_created')
    async createProduct(product: any) {
        this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image
        })
    }

    @EventPattern('product_update')
    async updateProduct(product: any) {
        this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        })
    }
}
