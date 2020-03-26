const connection = require('../database/connection') //arquivo de conexão com o banco de dados

module.exports = {
    //método listar incidents
    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] =  await connection('incidents').count(); //contando o total de registros e armazenando numa veriável na primeira posição do array

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //unindo duas tabelas, comparando os ids nas tabelas
            .limit(5)
            .offset((page - 1) * 5) //fazendo a paginação
            .select(['incidents.*', 
                'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'
            ]); //listando todos os dados de incidents, e alguns de ongs, e armazenando em um array
        
        //adicionando o total de incidents no head (cabeçalho), da response (resposta)
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    //método criar incidents (assíncrono)
    async create(request, response) {
        const {title, description, value} = request.body;
        
        //acessando o cabeçalho da requisição, parar pegar a autenticação de qual ong está logada
        const ong_id = request.headers.authorization;

        //pegando o id que está sendo cadastrado e indicando que a primeira posição do vetor é o [id]
        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        //retornando apenas o id
        return response.json({ id });
    },

    //deletando um icident
    async delete(request, response) {
        const { id } = request.params; //pegando o id passado na rota
        const ong_id = request.headers.authorization; //pegando o id da ong logada
        
        //como retorna só um objeto, pode usar o método first e retornar o primeiro
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        
        //verificando se esta ong logada cadastrou o incident que está tentando deletar
        if(incident.ong_id !== ong_id){
            return response.status(401).json({ error: "Operation not permitted." }); //status de não autorizado
        }

        //deletando caso seja autorizado
        await connection('incidents').where('id', id).delete();

        //retornando resposta que o usuário obteve sucesso, e o status 204 é para resposta com sucesso e que não possui conteúdo
        return response.status(204).send();
    }
};