const connection = require('../database/connection') //arquivo de conexão com o banco de dados

module.exports = {

    //criando a sessão
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if(!ong){
            return response.status(400).json({ error: 'No ONG found with this ID.' }); //erro 400: bad request
        }

        return response.json(ong);
    }
}