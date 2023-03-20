import express from "express";
import user from './controllers/userController.js';
import login from './controllers/loginController.js';

// atribui a router as funçoes do express.Router()
const router = express.Router();

// faz uso das rotas definidas apartir do conteúdo da controller selecionada
router.use('/user', user);
router.use('/login', login);

//exporta a router
export default router;