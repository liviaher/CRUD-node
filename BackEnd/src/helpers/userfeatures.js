import jwt from 'jsonwebtoken';

// Cria a função de geração de token
function generateToken(email, userName) {
  // define a senha secreta, deve ser igual a do arquivo jwt.js
  const secret = '5?kOJULvZ!';

  // gera o token com as informações desejadas e define um tempo de expiração do token
  return jwt.sign({ infoUser: { email, userName } }, secret, { expiresIn: 60 * 60 * 5 });
}

// exporta a função generateToken
export { generateToken };