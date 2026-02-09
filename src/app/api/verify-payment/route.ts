import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            try {
                await prisma.order.update({
                    where: { orderId: razorpay_order_id },
                    data: {
                        status: 'paid',
                        paymentId: razorpay_payment_id,
                    },
                });
            } catch (dbError) {
                console.error('Prisma update error:', dbError);
            }

            return NextResponse.json({
                success: true,
                message: 'Payment verified successfully'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Invalid signature'
            }, { status: 400 });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json({
            success: false,
            message: 'Verification failed'
        }, { status: 500 });
    }
}
