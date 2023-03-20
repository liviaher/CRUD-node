import express from "express";
import routes from "./routes.js";
import cors from "cors";

// atribui a constante api as funções do express 
const api = express();

// atribui a api o uso do cors que é um mecanismo usado para adicionar cabeçalhos http que informam aos navegadores para permitir que uma aplicação web seja executada em uma origem e acesse recursos de outra origem diferente.
api.use(cors());

// atribui o uso do json para leitura dos dados enviados
api.use(express.json());

// atribui o uso das rotas definidas em routes.js
api.use('/', routes);

// inicia a api na porta 3333
api.listen('3333', () => {
  console.log('Server is runing ...');
});