import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { code, cartTotal } = await req.json();

        if (!code) {
            return NextResponse.json({ error: 'Code is required' }, { status: 400 });
        }

        const discount = await prisma.discount.findUnique({
            where: {
                code: code.toUpperCase(),
            }
        });

        if (!discount || !discount.active || discount.status !== 'active') {
            return NextResponse.json({ error: 'Invalid or inactive discount code' }, { status: 404 });
        }

        // Check date
        const now = new Date();
        if (discount.endDate && discount.endDate < now) {
            return NextResponse.json({ error: 'Discount expired' }, { status: 400 });
        }

        if (discount.startDate && discount.startDate > now) {
            return NextResponse.json({ error: 'Discount not yet active' }, { status: 400 });
        }

        // Check min purchase
        const minPurchase = discount.minPurchaseRequirement ? Number(discount.minPurchaseRequirement) : 0;
        if (cartTotal < minPurchase) {
            return NextResponse.json({ error: `Minimum purchase of ₹${minPurchase} required` }, { status: 400 });
        }

        // Calculate discount amount
        let discountAmount = 0;
        const value = Number(discount.value);

        if (discount.type === 'percentage') {
            discountAmount = (cartTotal * value) / 100;
        } else {
            discountAmount = value;
        }

        // Ensure discount doesn't exceed total
        if (discountAmount > cartTotal) {
            discountAmount = cartTotal;
        }

        return NextResponse.json({
            valid: true,
            discountAmount,
            type: discount.type,
            code: discount.code
        });

    } catch (error) {
        console.error('Error validating discount:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
