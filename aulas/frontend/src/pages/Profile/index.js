import React, {useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './style.css';

export default function Profile(){

    const [incidents, setIncidents] = useState([]);
    const ongname = localStorage.getItem('ongname');
    const ongid = localStorage.getItem('ongid');
    const history = useHistory();

    useEffect(()=> { 
        api.get('profile', {
            headers: {
                Authorization: ongid,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongid]);
    
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongid,
                }
            });
            setIncidents(incidents.filter(incident => incident.id != id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=""/> 
                <span>Bem vinda, {ongname}</span>
                
                <Link className="button" to="/incident/new"> Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="submit">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick = { () => handleDeleteIncident(incident.id) } type="submit"> <FiTrash2 size={20} color="#0808b3"/> </button>
                </li>                
                ))}
            </ul>
            
        </div>
    );
}