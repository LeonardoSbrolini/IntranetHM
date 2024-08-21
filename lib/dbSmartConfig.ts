import sql from 'mssql';

const dbSmartConfig: sql.config = {
    user: process.env.DB_SMART_USER!,
    password: process.env.DB_SMART_PASSWORD!,
    server: process.env.DB_SMART_SERVER!,
    database: process.env.DB_SMART_DATABASE!,
    options: {
        encrypt: true, // Utilize esta opção se estiver se conectando a um Azure SQL
        trustServerCertificate: true // Pode ser necessário dependendo da configuração do servidor
    }
};

export default dbSmartConfig;
