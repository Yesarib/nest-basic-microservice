import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) {

    }

    async all(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async create(data: any): Promise<Product> {
        return new this.productModel(data).save();
    }

    async getProductById(id: number): Promise<Product> {
        return await this.productModel.findOne({ id: id })
    }

    async update(id: number, data: any): Promise<any> {
        return this.productModel.findOneAndUpdate({ id: id }, data)
    }
}
