import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const collections = await prisma.collection.findMany({
            orderBy: { createdAt: 'desc' },
        });

        const mappedCollections = collections.map((c: any) => ({
            ...c,
            _id: c.id.toString(),
            productCount: c.productIds ? c.productIds.length : 0
        }));

        return NextResponse.json(mappedCollections, { status: 200 });
    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const newCollection = await prisma.collection.create({
            data: {
                title: body.title,
                description: body.description,
                image: body.image,
                productIds: body.productIds,
                active: body.active !== undefined ? body.active : true
            }
        });

        return NextResponse.json({ ...newCollection, _id: newCollection.id.toString() }, { status: 201 });
    } catch (error) {
        console.error('Error creating collection:', error);
        return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
    }
}
