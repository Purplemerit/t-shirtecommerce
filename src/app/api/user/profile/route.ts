import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            profile: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
                // ... map other fields
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { email, updates } = await req.json();

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email required' }, { status: 400 });
        }

        // Use Prisma update
        try {
            const user = await prisma.user.update({
                where: { email },
                data: updates,
            });

            return NextResponse.json({ success: true, user });
        } catch (updateError: any) {
            if (updateError.code === 'P2025') {
                return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
            }
            throw updateError;
        }

    } catch (error) {
        console.error("Profile update error", error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
