import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // 1. Check Super Admin Credentials (from Env)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            return NextResponse.json({
                success: true,
                user: {
                    name: 'Administrator',
                    email: email,
                    role: 'admin'
                }
            });
        }

        // 2. Check Postgres for Regular Users
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
