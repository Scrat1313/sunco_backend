// src/product/product.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1 })
    id: number;

    @Column()
    @ApiProperty({ example: 'Chaussures Running' })
    name_product: string;

    @Column({ type: 'text' })
    @ApiProperty({ example: 'Chaussures très confortables et légères.' })
    description_product: string;

    @Column('text', { array: true })
    @ApiProperty({
        example: ['img1.jpg', 'img2.jpg'],
        type: [String],
    })
    images_product: string[];

    @Column('float')
    @ApiProperty({ example: 89.99 })
    price_product: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'chaussures-running' })
    slug_product: string;

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        this.slug_product = this.slugify(this.name_product);
    }

    private slugify(text: string): string {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
}
