import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Clear existing products to ensure fresh data
        await prisma.product.deleteMany();

        const products = [
            {
                name: "Yellow Bagh Block Printed Pure Cotton Saree",
                description: "A beautiful, handcrafted pure cotton saree with traditional Bagh block prints. Perfect for festive occasions and casual elegance.",
                price: 1100,
                mrp: 3999,
                category: "Saree",
                tags: ["women", "saree", "cotton", "traditional", "bagh"],
                images: ["/images/Rectangle 2.png", "/images/Rectangle 2 copy.png", "/images/Rectangle 4.png", "/images/Rectangle 5.png"],
                rating: 4.5,
                reviews: 124,
                colors: ["#ea580c", "#1a1a1a", "#7c2d12"],
                sizes: ["Free Size"]
            },
            {
                name: "Nike Air Max 90 Premium",
                description: "Premium comfort and timeless style.",
                price: 14999,
                mrp: 18999,
                category: "Shoes",
                tags: ["nike", "running", "men", "premium", "sports"],
                images: ["/images/Frame 16 copy.png"],
                rating: 4.5,
                reviews: 124
            },
            {
                name: "Nike Air Zoom Pegasus",
                description: "Built for runners of every level.",
                price: 12999,
                mrp: 15999,
                category: "Shoes",
                tags: ["nike", "running", "women", "sports"],
                images: ["/images/Frame 16.png"],
                rating: 4.7,
                reviews: 89
            },
            {
                name: "Adidas Ultra Boost",
                description: "Experience the energy return.",
                price: 17999,
                mrp: 21999,
                category: "Shoes",
                tags: ["adidas", "men", "running", "premium"],
                images: ["/images/Frame 15.png"],
                rating: 4.8,
                reviews: 200
            },
            {
                name: "Men Self Design Polo T-Shirt",
                description: "Sophisticated polo t-shirt with subtle self-design patterns.",
                price: 239,
                mrp: 999,
                category: "T-Shirts",
                tags: ["men", "polo", "casual", "genzy"],
                images: ["/images/Rectangle 4 copy 3.png"],
                rating: 3.9,
                reviews: 2700,
                colors: ["#3b82f6", "#1a1a1a", "#ffffff"],
                sizes: ["S", "M", "L", "XL", "XXL"]
            },
            {
                name: "Classic Fit Shirt",
                description: "Timeless classic fit shirt for any occasion.",
                price: 349,
                mrp: 799,
                category: "Shirts",
                tags: ["men", "shirts", "casual", "shopX"],
                images: ["/images/Rectangle 5 copy 2.png"],
                rating: 4.5,
                reviews: 1200
            }
        ];

        for (const p of products) {
            await prisma.product.create({
                data: {
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    mrp: p.mrp,
                    category: p.category,
                    tags: p.tags,
                    images: p.images,
                    rating: p.rating,
                    reviews: p.reviews,
                    colors: (p as any).colors || [],
                    sizes: (p as any).sizes || []
                }
            });
        }

        return NextResponse.json({ success: true, message: 'Products seeded successfully', count: products.length });
    } catch (error: any) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ success: false, error: 'Seeding failed: ' + error.message }, { status: 500 });
    }
}
