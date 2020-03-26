const express = require('express'); //importando pacote e atribuindo a variável
const routes = require('./routes'); //importando arquivo / mesmo estando na mesma pasta, ./ indica o caminho relativo do arquivo, neste caso o mesmo diretório
const cors = require('cors'); //determina quem pode acessar a aplicação

//criando a aplicação
const app = express();

app.use(cors());
app.use(express.json()); //informando a aplicação que usará o formato json para as requisições
app.use(routes); //indicando para utilizar as rotas

//porta atribuída para abrir a aplicação
app.listen(3333);