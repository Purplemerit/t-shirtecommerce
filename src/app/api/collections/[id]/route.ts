import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Simple mapping of Collection IDs to Categories (or just use ID as ID)
    try {
        let products: any[] = [];

        // Fallback: Check if we have products with this category
        if (id === 'all' || id === 'new-arrivals') {
            products = await prisma.product.findMany({
                orderBy: { createdAt: 'desc' },
                take: 10
            });
        } else {
            products = await prisma.product.findMany({
                where: {
                    category: {
                        contains: id,
                        mode: 'insensitive',
                    },
                },
            });
        }

        // Map id to _id for frontend compatibility and convert Decimals to Numbers
        const mappedProducts = products.map((p: any) => ({
            ...p,
            _id: p.id.toString(),
            price: Number(p.price),
            mrp: p.mrp ? Number(p.mrp) : null,
            rating: p.rating ? Number(p.rating) : 0
        }));

        const collection = {
            _id: id,
            title: id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' '),
            description: `Best ${id} collection`,
            products: mappedProducts
        };

        return NextResponse.json(collection);
    } catch (error) {
        console.error('Error fetching collection:', error);
        return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
    }
}
