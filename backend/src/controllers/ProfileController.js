const connection = require('../database/connection') //arquivo de conexão com o banco de dados

module.exports = {
    //método listar incidents
    async index(request, response) {
        const ong_id = request.headers.authorization; //id ong logada

        //pegando um caso específico
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        
        return response.json(incidents);
    }
}