const express = require('express');                 //importando pacote e atribuindo a variável

//importando os controladores
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//desacoplando o módulo de rotas e atribuindo a uma variável
const routes = express.Router();

/* incluindo as rotas da aplicação */

routes.get('/ongs', OngController.index);   //listar ongs
routes.post('/ongs', OngController.create); //criar ongs

routes.get('/profile', ProfileController.index) //buscando um incident específico

routes.post('/sessions', SessionController.create) //criando uma sessão

routes.get('/incidents', IncidentController.index);         //listar incidents
routes.post('/incidents', IncidentController.create);       //criar incidents
routes.delete('/incidents/:id', IncidentController.delete); //deletar incidents

//exportando uma variável de dentro de um arquivo no node / para acessá-la em outro. ex: routes
module.exports = routes;
