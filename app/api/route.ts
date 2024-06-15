import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: any, res: any) {
  try {
    const customers = await prisma.customer.findMany();

    const serializedCustomers = customers.map(customer => (
    {
      ...customer,
      cpf: customer.cpf.toString(),
      phone: customer.phone.toString(),
      cep: customer.cep.toString(),
    }
    ))

    return NextResponse.json(serializedCustomers);
  } catch (error) {
    console.error('Error retrieving customers:', error);
    return NextResponse.json({message: 'Error kkk'});
  }
}
