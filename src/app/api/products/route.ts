import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        const filter: any = {};
        if (category) {
            filter.OR = [
                { category: { contains: category, mode: 'insensitive' } },
                { tags: { hasSome: [category.toLowerCase()] } }
            ];
        }

        let products = await prisma.product.findMany({
            where: filter,
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Mock Fallback if DB is empty
        if (!products || products.length === 0) {
            console.warn('No products found in DB. Serving mock data.');
            const mockProducts: any[] = [
                {
                    id: 1, // Mock needs number ID for prisma type consistency but we return string _id
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
                    id: 2,
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
                    id: 3,
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
                    id: 4,
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
                    id: 5,
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
                    id: 6,
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
            return NextResponse.json(mockProducts);
        }

        // Map id to _id for frontend compatibility and convert Decimals to Numbers
        const mappedProducts = products.map((p: any) => ({
            ...p,
            _id: p.id.toString(),
            price: Number(p.price),
            mrp: p.mrp ? Number(p.mrp) : null,
            rating: p.rating ? Number(p.rating) : 0
        }));

        return NextResponse.json(mappedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
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
            // ... truncated for brevity, serving minimal mocks to keep file small if error
        ];
        return NextResponse.json(mockProducts);
    }
}
