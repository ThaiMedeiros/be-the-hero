const crypto = require('crypto');                   //pacote do node para criptografia
const connection = require('../database/connection') //arquivo de conexão com o banco de dados

module.exports = {
    //método listar ongs
    async index(request, response) {
        const ongs = await connection('ongs').select('*'); //listando todas
        return response.json(ongs);
    },

    //método criar ongs (assíncrono)
    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); //gerando o id automaticamente

        //cadastrando - o await indica ao node que só execute o próximo comando após o término deste
        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf
        });

        //retornando apenas o id
        return response.json({ id });
    }
};