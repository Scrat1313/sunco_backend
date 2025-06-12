// src/product/product.controller.ts
import {
    Controller, Post, Body, Get, Param, NotFoundException,
    UseInterceptors, UploadedFiles
} from '@nestjs/common';
import {
    ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiBody
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'images', maxCount: 5 }
    ], {
        storage: diskStorage({
            destination: './upload',
            filename: (_, file, cb) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                cb(null, `${uniqueName}${ext}`);
            },
        }),
    }))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name_product: { type: 'string' },
                description_product: { type: 'string' },
                price_product: { type: 'number' },
                images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' }
                }
            },
        },
    })
    @ApiOperation({ summary: 'Créer un produit avec upload d’images' })
    async create(
        @Body() dto: CreateProductDto,
        @UploadedFiles() files: { images?: Express.Multer.File[] }
    ): Promise<Product> {
        const imagePaths = files.images?.map(file => file.filename) ?? [];
        return this.productService.create({ ...dto, images_product: imagePaths });
    }

    @Get()
    @ApiOperation({ summary: 'Lister tous les produits' })
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':slug')
    @ApiOperation({ summary: 'Récupérer un produit par son slug' })
    @ApiParam({ name: 'slug', example: 'chaussures-running' })
    async findBySlug(@Param('slug') slug: string): Promise<Product> {
        const product = await this.productService.findBySlug(slug);
        if (!product) {
            throw new NotFoundException(`Produit avec le slug "${slug}" introuvable.`);
        }
        return product;
    }
}
