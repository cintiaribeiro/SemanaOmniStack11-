import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import style from './style';

export default function Incidents(){

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total,   setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDatail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){
        if (loading) {
            return;
        }

        if (total > 0  && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);

        setLoading(false);
    }
    
    useEffect( ()=>{
        loadIncidents();
    },[]);

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}> 
                    Total de <Text style={style.headerTextBold}> {total} caso</Text>
                </Text>
            </View>
            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um caso a baixo e salve o dia</Text>

            <FlatList 
                style={style.incidentsList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                // showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item:incident})=>(
                    <View style={style.incident}> 
                        <Text style={style.incidentPropety}> ONG:</Text>
                        <Text style={style.incidentValue}> {incident.name}</Text>
                        <Text style={style.incidentPropety}> Descrição:</Text>
                        <Text style={style.incidentValue}> {incident.title}</Text>
                        <Text style={style.incidentPropety}> Valor:</Text>
                        <Text style={style.incidentValue}> {Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)} </Text>
                        <TouchableOpacity
                            style={style.detailsButtons}
                            onPress={()=>navigateToDatail(incident)}
                        >
                            <Text style={style.detailsButtonsText}> Ver mais detalhes </Text>
                            <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />            
        </View>
    )
}
