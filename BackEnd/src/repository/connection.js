import mysql from  'mysql2/promise';

// cria a função de conexão com o banco
async function connect() {
    // cria a conexão com o banco a partir dos parâmetros definidos abaixo
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'crudDb'
    });

    return connection;
}

// exporta a função connect
export default {connect};
