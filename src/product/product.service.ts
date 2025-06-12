// src/product/product.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    private readonly BASE_URL = 'http://localhost:3000'; // à modifier si tu déploies ailleurs

    async create(dto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(dto);

        let baseSlug = this.slugify(product.name_product);
        let slug = baseSlug;
        let count = 1;

        while (await this.productRepository.findOne({ where: { slug_product: slug } })) {
            slug = `${baseSlug}-${count++}`;
        }

        product.slug_product = slug;

        try {
            const saved = await this.productRepository.save(product);
            return this.mapImageUrls(saved);
        } catch (err) {
            throw new ConflictException('Erreur lors de la création du produit.');
        }
    }

    async findAll(): Promise<Product[]> {
        const products = await this.productRepository.find();
        return products.map((p) => this.mapImageUrls(p));
    }

    async findBySlug(slug: string): Promise<Product | null> {
        const product = await this.productRepository.findOne({
            where: { slug_product: slug },
        });
        return product ? this.mapImageUrls(product) : null;
    }

    private slugify(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }

    private mapImageUrls(product: Product): Product {
        product.images_product = product.images_product.map(
            (filename) => `${this.BASE_URL}/upload/${filename}`,
        );
        return product;
    }

}
