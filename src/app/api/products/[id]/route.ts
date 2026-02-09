import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const mockProducts = [
    {
        _id: 'mock-1',
        name: "Nike Air Max 90 Premium",
        description: "Premium comfort and timeless style.",
        price: 14999,
        mrp: 18999,
        category: "Shoes",
        tags: ["nike", "running", "premium", "sports"],
        images: ["/images/Frame 16 copy.png"],
        rating: 4.5,
        reviews: 124
    },
    {
        _id: 'mock-2',
        name: "Premium Cotton T-Shirt",
        description: "Essential cotton t-shirt.",
        price: 999,
        mrp: 1499,
        category: "T-Shirts",
        tags: ["cotton", "basics", "casual"],
        images: ["/images/Frame 15 copy.png"],
        rating: 4.8,
        reviews: 45
    },
    {
        _id: 'mock-3',
        name: "Relaxed Fit Chinos",
        description: "Comfortable and stylish chinos.",
        price: 1899,
        mrp: 2499,
        category: "Pants",
        tags: ["chinos", "formal", "casual"],
        images: ["/images/Rectangle 2.png"],
        rating: 4.7,
        reviews: 22
    },
    {
        _id: 'mock-4',
        name: "Oversized Street Hoodie",
        description: "Soft hoodie for winter.",
        price: 2499,
        mrp: 3299,
        category: "Jackets",
        tags: ["hoodie", "winter", "casual"],
        images: ["/images/Rectangle 4.png"],
        rating: 4.9,
        reviews: 15
    },
    {
        _id: 'mock-5',
        name: "Premium Denim Jacket",
        description: "Classic denim jacket.",
        price: 3499,
        mrp: 4999,
        category: "Jackets",
        tags: ["denim", "jacket", "casual"],
        images: ["/images/Rectangle 23.png"],
        rating: 4.6,
        reviews: 56
    },
    {
        _id: 'mock-6',
        name: "Summer Shorts",
        description: "Comfortable shorts for beach.",
        price: 899,
        mrp: 1299,
        category: "Shorts",
        tags: ["shorts", "summer", "beach"],
        images: ["/images/Rectangle 5 copy.png"],
        rating: 4.3,
        reviews: 34
    }
];

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Handle Mock IDs explicitly
    if (id.startsWith('mock-')) {
        const mockProduct = mockProducts.find(p => p._id === id);
        if (mockProduct) {
            return NextResponse.json(mockProduct);
        }
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...product,
            _id: product.id.toString(),
            price: Number(product.price),
            mrp: product.mrp ? Number(product.mrp) : null,
            rating: product.rating ? Number(product.rating) : 0
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
