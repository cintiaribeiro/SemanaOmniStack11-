import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import App from '../App';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detais from './pages/Details';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={ {headerShown:false }}>
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Detail" component={Detais}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}