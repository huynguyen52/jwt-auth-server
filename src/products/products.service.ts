import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(
      this.productRepository.create(createProductDto),
    );
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async deleteById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      await this.productRepository.delete(id);
      return product;
    }
  }
}
