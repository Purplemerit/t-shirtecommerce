import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const ordersCount = await prisma.order.count();
        const customersCount = await prisma.user.count({
            where: { role: 'customer' }
        });

        // Simple aggregation for revenue
        const aggregate = await prisma.order.aggregate({
            _sum: {
                amount: true
            },
            where: {
                status: {
                    not: 'cancelled'
                }
            }
        });

        const revenue = aggregate._sum.amount ? parseFloat(aggregate._sum.amount.toString()) : 0;

        return NextResponse.json({
            revenue: revenue,
            orders: ordersCount,
            customers: customersCount,
            growth: '+15%' // Mock growth for now
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
