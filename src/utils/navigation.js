import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import IntroScreen from '../screens/intro';
import Step1Screen from '../screens/onboard/step_1';
import Step2Screen from '../screens/onboard/step_2';
import Login from '../screens/login/login';
import Wrapper from '../screens/components/wrapper/wrapper';
import Aulas from '../screens/components/niveis/aulas';
import NivelOne from '../screens/components/niveis/nivel1';
import NivelOneView from '../screens/components/niveis/nivel1_view';

import Loja from '../screens/components/loja/loja';
import Checkout from '../screens/components/loja/checkout';
import Tracking from '../screens/components/loja/tracking';
import Notification from '../screens/notification/notification'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Client from '../screens/store/cliente';
import RouterApi from './router_api';
import CourseProgramming from '../screens/store/course_programming';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import { db } from './firebase_config';
import GIFPlayer from 'react-native-gif';
import { View } from 'react-native';

const StackNavigator = createStackNavigator();

const AuthStackScreen = () => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                setIsLoading(true);
                const userJson = await AsyncStorage.getItem('uid');

                if (userJson !== null && userJson !== "") {
                    const userData = JSON.parse(userJson);
                    Client.setUid(userData);
                    const data = await RouterApi.get(`/aprendev/clientes/${Client.uid}`);
                    const dataVal = data.val();
                    Client.setCoins(dataVal.coins);
                    Client.setName(dataVal.nome);
                    Client.setEmail(dataVal.email);
                    Client.setNivel(dataVal.nivel);
                    Client.setHeart(dataVal.heart);
                    Client.setSelos(dataVal.selos);
                    Client.setSelos(dataVal.selos);
                    const dataC = await RouterApi.get('/aprendev/cursos');
                    const cursosData = dataC.val() || {};

                    const keys = Object.keys(cursosData).map(key => ({ key }));
                    const cursosArray = Object.keys(cursosData).map(key => cursosData[key]);
                    CourseProgramming.setKeysCourse(keys);
                    CourseProgramming.setCursos(cursosArray);

                    const matriculasQuery = query(ref(db, '/aprendev/matriculas'), orderByChild('uid'), equalTo(Client.uid));
                    const matriculasSnapshot = await get(matriculasQuery);

                    if (matriculasSnapshot.exists()) {
                        const matriculasData = matriculasSnapshot.val() || {};
                        const matriculasArray = Object.keys(matriculasData).map(key => matriculasData[key]);
                        CourseProgramming.setMatriculas(matriculasArray);
                    }
                    setUserLoggedIn(true);

                }
                setIsLoading(false);

            } catch (error) {
                console.error('Erro ao recuperar usuário do AsyncStorage:', error);
            }
        };

        checkUserLoggedIn();
    }, []);

    if (isLoading) {
        return (
            <View style={{
                position: 'absolute',
                height: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "rgba(0,0,0,1)"
            }}>
                <GIFPlayer
                    style={{
                        width: 100,
                        height: 100,
                    }} source={require('../../assets/cabeca_1.gif')}
                    resizeMode='cover'
                />
            </View>
        )
    } else {
        if (!isUserLoggedIn) {
            return (
                <NavigationContainer independent={true}>
                    <StackNavigator.Navigator>
                        <StackNavigator.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />

                        <StackNavigator.Screen name="Step1Onboard" component={Step1Screen} options={{ headerShown: false }} />
                        <StackNavigator.Screen name="Step2Onboard" component={Step2Screen} options={{ headerShown: false }} />
                        <StackNavigator.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    </StackNavigator.Navigator>
                </NavigationContainer>
            );
        }

        // User is logged in, render Main screen immediately
        return (
            <NavigationContainer independent={true}>
                <StackNavigator.Navigator>
                    <StackNavigator.Screen name="Main" component={Wrapper} options={{ headerShown: false }} />
                    <StackNavigator.Screen name="Aulas" component={Aulas} options={{ headerShown: false }} />
                    <StackNavigator.Screen name="NivelOne" component={NivelOne} options={{ headerShown: false }} />
                    <StackNavigator.Screen name="NivelOneView" component={NivelOneView} options={{ headerShown: false }} />
                    <StackNavigator.Screen name="Loja" component={Loja} options={{ headerShown: false }} />
                    <StackNavigator.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                    <StackNavigator.Screen name="Tracking" component={Tracking} options={{ headerShown: false }} />
                    <StackNavigator.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
                </StackNavigator.Navigator>
            </NavigationContainer>
        );
    }


};

export { AuthStackScreen };
