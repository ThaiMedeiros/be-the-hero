//pacotes
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

//api's
import api from '../../services/api';

//estilos
import './styles.css';

//imagens
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    //armazenando as informações dos casos
    const [incidents, setIncidents] = useState([]); //comaçando como array vazio, pois os dados estão sendo buscados

    const history = useHistory();

    //pegando dado que está sendo salvo no storage do navegador
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    //função para buscar os incidents relacionados a ong logada no bd. 
    //1º parametro função a ser executada, 2º array contendo campo/variavel que a cada mudança de valor a função executa novamente, caso fazio executa apenas uma vez
    useEffect(() => {
        api.get('profile', {
            headers: {Authorization: ongId,}
        }).then(response => {setIncidents(response.data);})
    }, [ongId]);

    //função para deletar um caso
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {headers: { Authorization: ongId, }});

            //fazendo varredura no array de incidents no estado, e apagando em tempo real da página assim que foi deletado
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    //função de logout
    function handleLogout(){
        localStorage.clear(); //limpando o localstorage apagando os dados armazenados
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {
                    //percorrendo os incidents com map, a hey no elemento, identifica-os de forma única, e o Intl no valor forata vários tipos de dados
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}