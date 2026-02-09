import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const discounts = await prisma.discount.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Map _id
        const mappedDiscounts = discounts.map((d: any) => ({
            ...d,
            _id: d.id.toString()
        }));

        return NextResponse.json(mappedDiscounts, { status: 200 });
    } catch (error) {
        console.error('Error fetching discounts:', error);
        return NextResponse.json({ error: 'Failed to fetch discounts' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Unique code check
        const existing = await prisma.discount.findUnique({
            where: { code: body.code }
        });

        if (existing) {
            return NextResponse.json({ error: 'Discount code already exists' }, { status: 400 });
        }

        const newDiscount = await prisma.discount.create({
            data: {
                code: body.code,
                type: body.type || 'percentage',
                value: body.type === 'percentage' ? parseFloat(body.percentage || 0) : parseFloat(body.amount || 0),
                active: body.active !== undefined ? body.active : true,
                endDate: body.expiresAt ? new Date(body.expiresAt) : null,
                minPurchaseRequirement: body.minPurchaseRequirement ? parseFloat(body.minPurchaseRequirement) : 0,
            }
        });

        return NextResponse.json({ ...newDiscount, _id: newDiscount.id.toString() }, { status: 201 });
    } catch (error) {
        console.error('Error creating discount:', error);
        return NextResponse.json({ error: 'Failed to create discount' }, { status: 500 });
    }
}
