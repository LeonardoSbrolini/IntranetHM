// app/api/users/[id].ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const user = await prisma.users.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (user) {
            return NextResponse.json(user);
        } else {
            return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
