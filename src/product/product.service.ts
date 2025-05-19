import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(data: Product): Promise<Product> {
    const created = new this.productModel(data);
    return created.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product | null> {
  return this.productModel.findById(id).exec();
}

async update(id: string, updateData: Partial<Product>): Promise<Product | null> {
  return this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

async remove(id: string): Promise<Product | null> {
  return this.productModel.findByIdAndDelete(id).exec();
}

}
