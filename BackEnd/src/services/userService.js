import database from "../repository/connection.js";

// cria a função de inserção de usuários
async function insertUser(userName, email, password) {
    // cria a conexão com o banco
    const conn = await database.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'INSERT INTO users_tbl(user_name, email, user_password) VALUES(?,?,?);';
    // recebe os dados do front-end como array
    const dataUser = [userName, email, password];
    // envia para o banco a união da query e dos dados do front-end
    await conn.query(sql, dataUser);
    //encerra a conexão com banco
    conn.end();
}

// cria a função de busca de usuários
async function findUser() {
    // cria a conexão com o banco
    const conn = await database.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'SELECT user_name, email FROM users_tbl';
    // envia para o banco a query
    const [rows] = await conn.query(sql);
    //encerra a conexão com banco
    conn.end();
    // retorna os resultados
    return rows;
}

async function updateUser(userName, email, password, idUser) {
    // cria a conexão com o banco
    const conn = await database.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'UPDATE users_tbl SET user_name = ?, email = ?, user_password = ? WHERE user_id = ?'
    // recebe os dados do front-end como array
    const dataUser = [userName, email, password, idUser];
    // envia para o banco a união da query e dos dados do front-end
    await conn.query(sql, dataUser);
    //encerra a conexão com banco
    conn.end();
}

async function deleteUser(idUser) {
    // cria a conexão com o banco
    const conn = await database.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'DELETE from users_tbl WHERE user_id = ?';
    // recebe os dados do front-end como array
    const dataUser = [idUser];
    // envia para o banco a união da query e dos dados do front-end
    await conn.query(sql, dataUser);
    //encerra a conexão com banco
    conn.end();
}

//exporta as funções definidas no parâmetro {}
export default { insertUser, findUser, updateUser, deleteUser };