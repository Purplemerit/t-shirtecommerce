import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Calculate Total Sales & Orders for the last 24 hours (hourly breakdown)
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const orders = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: twentyFourHoursAgo
                }
            }
        });

        // Initialize hourly buckets
        const hourlyData = new Array(24).fill(0).map((_, i) => {
            const d = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
            return {
                hour: d.getHours(), // 0-23
                name: d.toLocaleTimeString([], { hour: '2-digit', hour12: true }),
                sales: 0,
                orders: 0
            };
        });

        // Fill buckets
        orders.forEach((order: any) => {
            const orderDate = new Date(order.createdAt);
            // approximate matching to bucket (simple approach)
            const diffHours = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60));
            const bucketIndex = 23 - diffHours;

            if (bucketIndex >= 0 && bucketIndex < 24) {
                hourlyData[bucketIndex].sales += Number(order.amount);
                hourlyData[bucketIndex].orders += 1;
            }
        });

        // 2. Aggregate Totals
        const totalSales24h = orders.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
        const totalOrders24h = orders.length;

        // 3. Mock Session Data (since we don't track pageviews in DB directly yet)
        const derivedSessions = hourlyData.map(d => ({
            ...d,
            sessions: Math.floor(d.orders * 30 + Math.random() * 10) // Mock logic
        }));

        // 4. Aggregate by Location (Country)
        const locationMap: Record<string, number> = {};
        orders.forEach((o: any) => {
            const country = (o.shippingInfo as any)?.country || 'Unknown';
            locationMap[country] = (locationMap[country] || 0) + 1;
        });

        const locationData = Object.keys(locationMap).map(k => ({
            name: k,
            value: locationMap[k]
        })).sort((a, b) => b.value - a.value).slice(0, 5); // Top 5

        return NextResponse.json({
            hourlyData: derivedSessions,
            stats: {
                totalSales: totalSales24h,
                totalOrders: totalOrders24h,
                conversionRate: totalOrders24h > 0 ? (totalOrders24h / (totalOrders24h * 30)) * 100 : 0
            },
            locationData
        });

    } catch (error) {
        console.error('Analytics API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
