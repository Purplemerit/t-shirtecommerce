import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const newTransfer = await prisma.transfer.create({
            data: {
                origin: body.origin,
                destination: body.destination,
                status: body.status || 'pending',
                items: body.items || [],
                referenceName: body.referenceName,
                notes: body.notes,
                tags: body.tags || [],
                dateCreated: body.dateCreated ? new Date(body.dateCreated) : new Date(),
            }
        });

        return NextResponse.json({ ...newTransfer, _id: newTransfer.id.toString() }, { status: 201 });
    } catch (error) {
        console.error('Error creating transfer:', error);
        return NextResponse.json({ error: 'Failed to create transfer' }, { status: 500 });
    }
}
