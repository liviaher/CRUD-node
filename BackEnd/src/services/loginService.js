import db from '../repository/connection.js';

// cria a função de seleção do usuário que deseja efetuar o login
async function selectLogin(email, password) {
    // cria a conexão com o banco
    const conn = await db.connect();
    // define a query que deverá ser enviada ao banco de dados
    const sql = 'SELECT email, user_name FROM users_tbl WHERE email = ? AND user_password = ?';
    // recebe os dados do front-end como array
    const dataLogin = [email, password];
    // envia para o banco a união da query e dos dados do front-end
    const [rows] = await conn.query(sql, dataLogin);
    //encerra a conexão com banco
    conn.end();
    // retorna os resultados
    return rows;
}

// exporta a função selectLogin
export default { selectLogin };