import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: any) {
    if (req.method == 'GET') {
        try {
            const customers = await prisma.customers.findMany();
            const serializedCustomers = JSON.parse(
                JSON.stringify(customers, (key, value) =>
                    typeof value === 'bigint' ? value.toString() : value
                )
            )
            if (serializedCustomers) {
                console.log('entrou no IF')
                return NextResponse.json(serializedCustomers);
            } else {
                return NextResponse.json({ message: 'Os clientes não foram encontrados' })
            }
        } catch (error) {
            console.error('Erro ao buscar os clientes:', error);
            return NextResponse.json({ message: 'Erro interno' });
        }
    } else {
        return NextResponse.json({ message: 'Metodo não suportado' })
    }
}



export async function POST(req: any) {
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
