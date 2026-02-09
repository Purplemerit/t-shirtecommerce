import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { currentProductId, category, tags, limit = 4 } = body;

        let recommendations = [];
        let sourceTags = tags || [];
        let sourceCategory = category;

        // Context Setup via DB Lookup if ID provided (and not mock)
        if (currentProductId && !currentProductId.startsWith('mock-')) {
            const product = await prisma.product.findUnique({
                where: { id: parseInt(currentProductId) }
            });
            if (product) {
                sourceCategory = product.category;
                sourceTags = product.tags || [];
            }
        }

        if (sourceCategory || (sourceTags && sourceTags.length > 0)) {
            // --- Strategy 1: Content-Based Filtering via Prisma ---
            // Find candidates that share category OR have matching tags
            // Prisma doesn't support complex OR with array overlaps easily in one go combined with scoring
            // So we fetch a broader set and score in JS, or multiple queries.
            // Let's fetch candidates by Category OR Tags.

            const candidates = await prisma.product.findMany({
                where: {
                    OR: [
                        { category: sourceCategory },
                        { tags: { hasSome: sourceTags } }
                    ],
                    NOT: {
                        id: currentProductId && !currentProductId.startsWith('mock-') ? parseInt(currentProductId) : undefined
                    }
                },
                take: 20
            });

            // Scoring Algorithm in JS
            const scoredCandidates = candidates.map((p: any) => {
                let score = 0;
                // Rule A: Category Match
                if (sourceCategory && p.category === sourceCategory) score += 10;
                // Rule B: Tag Overlap
                const pTags = p.tags || [];
                const commonTags = pTags.filter((t: string) => sourceTags.includes(t));
                score += (commonTags.length * 5);

                return { ...p, _score: score };
            });

            recommendations = scoredCandidates
                .sort((a: any, b: any) => b._score - a._score)
                .slice(0, limit);

        } else {
            // --- Strategy 2: Trending / Random (Fallback) ---
            recommendations = await prisma.product.findMany({
                orderBy: [
                    { rating: 'desc' },
                    { reviews: 'desc' }
                ],
                take: limit
            });
        }

        // Map id to _id
        const mappedRecs = recommendations.map((p: any) => ({
            ...p,
            _id: p.id.toString()
        }));

        return NextResponse.json({ success: true, count: mappedRecs.length, recommendations: mappedRecs });

    } catch (error) {
        console.error('Recommendation Error:', error);

        // Mock fallback
        const mockRecs = [
            {
                _id: 'mock-2',
                name: "Premium Cotton T-Shirt",
                price: 999,
                category: "T-Shirts",
                images: ["/images/Frame 15 copy.png"],
                rating: 4.8
            },
            {
                _id: 'mock-3',
                name: "Relaxed Fit Chinos",
                price: 1899,
                category: "Pants",
                images: ["/images/Rectangle 2.png"],
                rating: 4.7
            },
            {
                _id: 'mock-5',
                name: "Premium Denim Jacket",
                price: 3499,
                category: "Jackets",
                images: ["/images/Rectangle 23.png"],
                rating: 4.6
            },
            {
                _id: 'mock-1',
                name: "Nike Air Max 90 Premium",
                price: 14999,
                category: "Shoes",
                images: ["/images/Frame 16 copy.png"],
                rating: 4.5
            }
        ];

        return NextResponse.json({ success: true, count: mockRecs.length, recommendations: mockRecs });
    }
}
