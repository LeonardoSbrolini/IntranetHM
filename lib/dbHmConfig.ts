import sql from 'mssql';

const dbHMConfig: sql.config = {
    user: process.env.DB_HM_USER!,
    password: process.env.DB_HM_PASSWORD!,
    server: process.env.DB_HM_SERVER!,
    database: process.env.DB_HM_DATABASE!,
    options: {
        encrypt: true, // Utilize esta opção se estiver se conectando a um Azure SQL
        trustServerCertificate: true // Pode ser necessário dependendo da configuração do servidor
    }
};

export default dbHMConfig;
