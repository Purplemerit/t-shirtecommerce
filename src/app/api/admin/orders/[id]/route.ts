import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Try finding by internal ID first (Int), if fails maybe it's orderId (String)?
        // Frontend likely sends internal ID from previous list call.
        // Prisma schema uses Int for `id`.

        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) }
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ ...order, _id: order.id.toString() }, { status: 200 });
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();

        // Prisma update
        // We only expect 'status' or maybe shipping updates

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: body // Assuming body fields match schema or are subsets
        });

        return NextResponse.json({ ...updatedOrder, _id: updatedOrder.id.toString() }, { status: 200 });
    } catch (error) {
        console.error('Error updating order:', error);
        if ((error as any).code === 'P2025') {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
