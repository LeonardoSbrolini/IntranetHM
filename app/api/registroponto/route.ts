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
      const result = await sql.query`
      SELECT
        rp.cartaoPonto_id	,
        rp.cartaoPonto_usuario_id	,
        LOWER(u.usuario_nome) as funcionario,
        u.usuario_cpf,
        u.usuario_dtNasc,
        u.usuario_rg,
        u.usuario_celular,
        u.usuario_cracha,
        u.usuario_cargo_id,
        c.cargo_nome,
        u.usuario_setor_id,
        LOWER(s.setor_nome) as setor,
        LOWER(rp.cartaoPonto_tipo) as tipo,
        rp.cartaoPonto_data_evento as data,
        rp.cartaoPonto_hora1	,
        rp.cartaoPonto_hora2	,
        rp.cartaoPonto_hora3	,
        rp.cartaoPonto_hora4	,
        rp.cartaoPonto_data_plantaoFolga	,
        rp.cartaoPonto_justificativa	,
        LOWER(rp.cartaoPonto_status)	as status,
        rp.cartaoPonto_data_envio as envio,
        rp.cartaoPonto_exportacao as exportado
      FROM cartaoPonto rp
      JOIN usuarios u ON rp.cartaoPonto_usuario_id = u.usuario_id
      JOIN cargos c ON u.usuario_cargo_id = c.cargo_id
      JOIN setores s ON u.usuario_setor_id = s.setor_id`;

      if (result.recordset.length > 0) {
        return NextResponse.json(result.recordset);
      } else {
        return NextResponse.json({ message: 'Nenhum registro encontrado' });
      }
    } catch (error) {
      console.error('Erro ao buscar os registros:', error);
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