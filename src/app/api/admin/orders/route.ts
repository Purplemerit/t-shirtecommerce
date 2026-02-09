import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Transform for display if needed
        const formattedOrders = orders.map((order: any) => ({
            id: order.orderId,
            customer: order.shippingInfo?.fullName || 'Guest',
            amount: `$${order.amount}`,
            status: order.status,
            date: new Date(order.createdAt).toLocaleDateString(),
            _id: order.id.toString(), // frontend expects string
        }));

        return NextResponse.json(formattedOrders, { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation or just spread the body
        // Prisma create requires exact schema match or connect logic
        // Assuming body matches schema for now, or adapt as needed.
        // Usually admin creates order manually?

        const newOrder = await prisma.order.create({
            data: {
                orderId: body.orderId || `ord_${Date.now()}`,
                userEmail: body.userEmail,
                amount: body.amount,
                items: body.items || [],
                shippingInfo: body.shippingInfo || {},
                status: body.status || 'pending',
                currency: 'INR'
            }
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
