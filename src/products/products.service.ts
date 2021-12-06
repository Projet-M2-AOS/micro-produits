import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "./product.schema";
import {Model, ObjectId} from "mongoose";
import {CreateProductDto} from "./dto/create.product.dto";
import {UpdateProductDto} from "./dto/update.product.dto";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    }

    async create(createProductType: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductType);
        return createdProduct.save();
    }

    delete(id: ObjectId) {
        return this.productModel.findByIdAndDelete(id).exec()
    }

    update(id: ObjectId, partialProduct: UpdateProductDto) {
        return this.productModel.findByIdAndUpdate(id, partialProduct).exec()
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: ObjectId): Promise<Product> {
        return this.productModel.findById(id).exec();
    }
}
