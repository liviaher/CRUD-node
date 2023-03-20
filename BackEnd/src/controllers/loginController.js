import express from "express";
import { request } from "express";
import { body, validationResult } from "express-validator";
import { generateToken } from "../helpers/userfeatures.js";
import db from "../services/loginservice.js";

const router = express.Router();

router.post('/', [
    // verifica se o email é válido
    body('email').isEmail().withMessage('Informe um email válido'),
], async (request, response) => {
    //recebe os dados do front-end
    const { email, password } = request.body;
    // faz as verificacões dos dados recebidos pelo front-end com base no que foi definido no [] após o router.post('/',
    const errors = validationResult(request);
    //envia para o banco os dados do front-end
    const results = await db.selectLogin(email, password,);

    // se após a verificação dos dados for verificado que há algum erro ele retorna o status 400 com a mensagem definida anterior mente
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    //Tenta fazer o login
    try {
        //se os reltados recebidos for igual a 0 ele retorna um status 401 com a mensagem de usuário ou senha inválido
        if (results == 0) {
            return response.status(401).json({ message: `Usuário ou senha inválido` });
        } else {
            // caso ocorra como o planejado ele recebe os resultados e os salva na constante
            const { email, user_name, user_id } = results[0];
            // gera um token com as informações desejadas
            const token = generateToken(email, user_name, user_id);
            // retorna para o usuário um staus 200 com a mensagem de sucesso
            response.status(200).json({ message: 'Login efetuado com sucesso', token });
        }
    }
    catch (err) {
        // caso haja algúm erro após as verificações a variável err capitura o erro e a api retorna o status 500 e informa o erro ocorrido
        response.status(500).json({ message: `Encontramos um erro: ${err}` });
    }

});

// exporta o arquivo
export default router;