import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Map id to _id
        const mappedProducts = products.map((p: any) => ({
            ...p,
            _id: p.id.toString()
        }));

        return NextResponse.json(mappedProducts, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation
        const { name, description, price, mrp, category, tags, images, rating, reviews, colors, sizes } = body;

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                mrp: mrp ? parseFloat(mrp) : null,
                category,
                tags,
                images,
                rating: rating ? parseFloat(rating) : 0,
                reviews: reviews ? parseInt(reviews, 10) : 0,
                colors: colors || [],
                sizes: sizes || []
            }
        });

        // Map id to _id
        const mappedProduct = {
            ...newProduct,
            _id: newProduct.id.toString()
        };

        return NextResponse.json(mappedProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
