import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { amount, items, shippingInfo, discountCode } = await req.json();

        // Validate required fields
        if (!amount || !shippingInfo) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Create Order in Razorpay
        const options = {
            amount: Math.round(amount * 100), // amount in cents/paise, ensure integer
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // 2. Save Pending Order to Postgres
        try {
            await prisma.order.create({
                data: {
                    orderId: razorpayOrder.id,
                    userEmail: shippingInfo.email,
                    items: items || [], // JSON type automatically handled
                    shippingInfo: shippingInfo, // JSON type automatically handled
                    amount: amount,
                    currency: 'INR',
                    status: 'pending',
                    discountCode: discountCode || null,
                },
            });
        } catch (dbError) {
            console.error('Prisma Error creating order:', dbError);
            // Proceed anyway
        }

        return NextResponse.json(razorpayOrder);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
    }
}
