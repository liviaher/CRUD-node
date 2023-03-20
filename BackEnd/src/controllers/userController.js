import express, { response, request } from "express";
import { body, validationResult } from "express-validator";
import db from "../services/userservice.js";
const router = express.Router();

// Método POST, tem a função de enviar e receber dados, neste exemplo ele envia para a service os dados recebidos do body do front-end
router.post('/', [
  // Está área é responsável para que seja validado os dados recebidos do front-end
  body('email').isEmail().withMessage('Informe um Email válido'), //valida o email
  body('password').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('A senha deve conter no mínimo 8 caracteres. Podendo ser letras maiúsculas ou minúsculas, números e caracteres especiais'), // Define o parâmetro de senha forte.
], async (request, response) => {
  // recebe os dados do front-end
  const { userName, email, password } = request.body;
  // faz as verificacões dos dados recebidos pelo front-end com base no que foi definido no [] após o router.post('/',
  const erros = validationResult(request);
  // se após a verificação dos dados for verificado que há algum erro ele retorna o status 400 com a mensagem definida anterior mente
  if (!erros.isEmpty()) {
    return response.status(400).json({ message: erros.array() });
  }

  // tenta cadastrar o usuário no banco de dados
  try {
    // envia os dados do front-end para o banco de dados, por meio da função insert user
    await db.insertUser(userName, email, password);

    // se após as verificações tudo ocorrer como deveria ele retorna um status 201 com a mensagem de sucesso
    if (response.status(201)) {
      response.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }

  } catch (err) {
    // caso haja algúm erro após as verificações a variável err capitura o erro e a api retorna o status 500 e informa o erro ocorrido
    response.status(500).json({ message: `Encontramos um erro: ${err}` })
  }
});

// Método GET tem a função de apenas enviar dados, neste exemplo ele busca os dados do banco de dados e retona ao usuário os resultados da busca
router.get('/', async (request, response) => {
  // por meio da função findUser ele faz a busca dos dados no banco de dados e salva essas informações na constante results
  const results = await db.findUser();

  // Tenda mostrar os resultados, se for igual a 0 siginifica que não há dados e por isso ele retorna o status 204, caso haja dados ele retorna um status 200 com os resultados
  try {
    if (results.length == 0) {
      response.status(204).end();
    } else {
      response.status(200).json(results);
    }
  }

  catch (err) {
    // caso haja algúm erro após as verificações a variável err capitura o erro e a api retorna o status 500 e informa o erro ocorrido
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }
});

// Método PUT, tem a função de enviar e receber dados utilizado comunmente para atualizar mais de um dado, se fosse apenas um dados para ser atualizado poderia fazer o uso do método PATCH, neste exemplo ele envia para a service os dados recebidos do body do front-end

// Devido à formatação do PUT ser praticamente igual ao POST tendo as únicas diferenças é que o body envia também o id do usuário e a função de cadastro ser updateUser não haverá comentários nessa parte do código
router.put('/', [
  body('email').isEmail().withMessage('Informe um Email válido'),
  body('password').isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('A senha deve conter no mínimo 8 caracteres. Podendo ser letras maiúsculas ou minúsculas, números e caracteres especiais'),
], async (request, response) => {
  const { userName, email, password, idUser } = request.body;

  const erros = validationResult(request);

  if (!erros.isEmpty()) {
    return response.status(400).json({ message: erros.array() });
  }

  try {
    await db.updateUser(userName, email, password, idUser);
    response.status(201).json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` })
  }
});

// Método DELETE como o próprio nome indica tem a função de deletar algo, neste exemplo ele deleta o usuário que for passado na url como parâmetro
router.delete('/:idUser', async (request, response) => {
  // Recebe o id que foi passado como parâmetro na url
  const { idUser } = request.params;

  // envia o id para a função deleteUser onde será deletado o usuário desejado
  db.deleteUser(idUser);

  // Tenta deletar o usuário
  try {
    // Caso tudo ocorra de acordo com o esperado ele retorna o status 201 com a mensagem de sucesso
    response.status(201).json({ messege: 'Usuário deletado com sucesso' });
    
  } catch (err) {
    // caso haja algúm erro após as verificações a variável err capitura o erro e a api retorna o status 500 e informa o erro ocorrido
    response.status(500).json({ messege: `Encontramos um erro: ${err}` })
  }
});

// exporta o arquivo
export default router;