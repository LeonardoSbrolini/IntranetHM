import sql, { pool } from 'mssql';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import dbHmConfig from '@/lib/dbHmConfig'; // Importa a configuração do banco de dados

export async function POST(req: any) {
  console.log('CHEGOU')
  if (req.method === 'POST') {
    
    try {
      const { username, password } = await req.json();
      // Conectando ao SQL Server
      await sql.connect(dbHmConfig);

      // Executando a consulta para buscar o usuário
      const result = await sql.query`SELECT * FROM usuarios WHERE usuario_login = ${username} AND usuario_senha = ${password}`;
      if (result.recordset.length > 0) {
        return NextResponse.json(result.recordset[0]);
      } else {
        return NextResponse.json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar o usuário:', error);
      return NextResponse.json({ message: 'Erro interno' });
    } finally {
      if (pool) {
        pool.close(); // Certifique-se de fechar a conexão
      } // Certifique-se de fechar a conexão
    }
  } else {
    return NextResponse.json({ message: 'Método não suportado' });
  }
}