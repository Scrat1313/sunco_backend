// src/product/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Chaussures Running' })
    name_product: string;

    @ApiProperty({ example: 'Des chaussures légères et performantes.' })
    description_product: string;

    @ApiProperty({ example: ['img1.jpg', 'img2.jpg'], type: [String] })
    images_product: string[];

    @ApiProperty({ example: 89.99 })
    price_product: number;
}
