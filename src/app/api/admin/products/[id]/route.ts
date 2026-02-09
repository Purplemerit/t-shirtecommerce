import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Map id to _id
        const mappedProduct = {
            ...product,
            _id: product.id.toString()
        };

        return NextResponse.json(mappedProduct);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, description, price, mrp, category, tags, images, colors, sizes } = body;

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                price: parseFloat(price),
                mrp: mrp ? parseFloat(mrp) : null,
                category,
                tags,
                images,
                colors,
                sizes
            }
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
