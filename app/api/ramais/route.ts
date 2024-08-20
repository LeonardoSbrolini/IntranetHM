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
      const result = await sql.query`SELECT * FROM ramais`;

      if (result.recordset.length > 0) {
        return NextResponse.json(result.recordset);
      } else {
        return NextResponse.json({ message: 'Nenhum ramal encontrada' });
      }
    } catch (error) {
      console.error('Erro ao buscar os ramais:', error);
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