import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            where: { role: 'customer' },
            orderBy: { createdAt: 'desc' },
        });

        // Map id to _id
        const mappedUsers = users.map((u: any) => ({
            ...u,
            _id: u.id.toString(),
            totalSpent: 0, // Mock for now or compute via aggregate
            orders: 0 // Mock or compute via count of u.orders
        }));

        return NextResponse.json(mappedUsers, { status: 200 });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // In a real app this would handle password hashing etc, keeping simple for mockup
        const hashedPassword = await bcrypt.hash(body.password || 'password123', 10);

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                role: 'customer',
                phone: body.phone,
            }
        });

        return NextResponse.json({ ...newUser, _id: newUser.id.toString() }, { status: 201 });
    } catch (error) {
        console.error('Error creating customer:', error);
        return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }
}
