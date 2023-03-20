import { Jwt } from "jsonwebtoken";

// cria a função que verificará o token jwt
function verifyJWT(req, res, next) {
    // define a senha secreta
    const secret = '5?kOJULvZ!';
    // salva na constante a informação busca de token no header
    const authHeader = req.headers.authorization;
    // se não haver um token ele retorna o 401 com a mesagem definida
    if (!authHeader) return res.status(401).send({ messege: 'Token não informado.' });
    // separa as partes do authHeader e salva na constante
    const parts = authHeader.split(' ');
    // verifica se o token é válido
    if (parts.legth !== 2) return res.status(401).send({ messege: 'Token Inválido.' });
    const [schema, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ message: 'Token inválido' });

    Jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            // com base nos dados recebidos verifica se o token é valido, caso não for ele retorna o status 400 com a mensagem definida
            return res.status(401).send({ messege: 'Usuário não autenticado.' })
        }
        // caso ocorra como o esperado ele decodifica as informações contidas no token
        req.infoUser = decoded.infoUser;
        return next();
    });
}
// exporta a função verifyJWT
export { verifyJWT };