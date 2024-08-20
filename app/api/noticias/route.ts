import sql, { pool } from 'mssql';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import dbHmConfig from '@/lib/dbHmConfig'; // Importa a configuração do banco de dados

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Conectando ao SQL Server
      await sql.connect(dbHmConfig);
      // Executando a consulta para buscar todas as notícias
      const result = await sql.query`SELECT * FROM avisos`;

      if (result.recordset.length > 0) {
        return NextResponse.json(result.recordset);
      } else {
        return NextResponse.json({ message: 'Nenhuma notícia encontrada' });
      }
    } catch (error) {
      console.error('Erro ao buscar as notícias:', error);
      return NextResponse.json({ message: 'Erro interno' });
    } finally {
      if (pool) {
        pool.close(); // Certifique-se de fechar a conexão
      }
    }
  } else {
    return NextResponse.json({ message: 'Método não suportado' });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // Conectando ao SQL Server
      await sql.connect(dbHmConfig);

      // Executando a consulta para buscar o usuário
      const result = await sql.query`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
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
