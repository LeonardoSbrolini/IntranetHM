import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: any, res: any,) {
    console.log('chegou GET')
    if (req.method == 'GET') {
        console.log('É uma req GET')
        try {
            const user = await prisma.users.findMany();
            if (user) {
                console.log('Response:', user)
                return NextResponse.json(user);
            } else {
                return NextResponse.json({ message: 'Usuário não encontrado' })
            }
        } catch (error) {
            console.error('Error retrieving user:', error);
            return NextResponse.json({ message: 'Internal server error' });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' })
    }
}



export async function POST(req: any, res: any,) {
    console.log('chegou')
    if (req.method == 'POST') {
        console.log('É uma req POST')
        try {
            const user = await prisma.users.findFirst({
                where: {
                    username: req.body.username,
                    password: req.body.password
                }
            });
            console.log('achou o usuário')
            if (user) {
                console.log('usuario:', user)
                return NextResponse.json(user);
            } else {
               return NextResponse.json({ message: 'Usuário não encontrado' })
            }
        } catch (error) {
            console.error('Error retrieving user:', error);
            return NextResponse.json({ message: 'Internal server error' });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' })
    }
}
