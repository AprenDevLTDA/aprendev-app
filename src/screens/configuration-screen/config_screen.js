import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import PerfilButtonComponent from '../components/button/perfil_button.component';
import Navbar from '../components/navBar/navBar';
import Client from '../store/cliente';
import CourseProgramming from '../store/course_programming';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { equalTo, get, orderByChild, query, ref, } from 'firebase/database';
import { db } from '../../utils/firebase_config';
import RouterApi from '../../utils/router_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';



const Notification = require('../../../assets/icon_notif.png')
const PF = require('../../../assets/faq.png');
const Chat = require('../../../assets/chat.png')

export default ConfigScreen = observer(() => {
    const navigation = useNavigation();

    const deleteProfile = async () => {
        const matriculasQuery = query(ref(db, '/aprendev/enrollments'), orderByChild('uid'), equalTo(Client.uid));
        const querySnapshot = await get(matriculasQuery);

        if (querySnapshot.exists()) {
            let keyarray = Object.keys(querySnapshot.val());

            for (let index = 0; index <= keyarray.length; index++) {
                await RouterApi.delete(`/aprendev/enrollments/${keyarray[index]}`);
            }

        }
        await RouterApi.delete(`/aprendev/clients/${Client.uid}`);
        await AsyncStorage.removeItem("uid");
        CourseProgramming.logOff();
        Client.logOff();
        Client.setIsUserLoggedIn(false);
        navigation.navigate("IntroScreen");
    }
    return (
        <SafeAreaView style={{
            backgroundColor: "#E2E8F0",
            height: "100%"
        }}>
            <Navbar />
            <ScrollView contentContainerStyle={{ marginHorizontal: 12 }}>
                <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity onPress={() => {
                        CourseProgramming.setNivel(0);
                        Client.setProgress("");
                        navigation.goBack()

                    }}>
                        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                            <Icon name="arrow-back" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20 }}>Configurações</Text>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 25,
                    gap: 10,
                }}>

                    <PerfilButtonComponent
                        redirect={"Notification"}
                        showIcon={false}
                        expandable={false}
                        texto={'Notificações'}
                        sourceImage={Notification}
                    ></PerfilButtonComponent>
                    <PerfilButtonComponent
                        texto={'Perguntas frequentes'}
                        sourceImage={PF}
                        redirect={"Faq"}
                        showIcon={false}
                        expandable={false}

                    >

                    </PerfilButtonComponent>
                    <PerfilButtonComponent
                        redirect={"Notification"}
                        showIcon={false}
                        expandable={false}
                        texto={'Fale Conosco'}
                        sourceImage={Chat}


                    >
                    </PerfilButtonComponent>
                    <TouchableOpacity onPress={() => deleteProfile()} style={{ marginTop: "70%" }}>
                        <Text style={{ color: "red", fontSize: 12 }}>
                            Excluir conta
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    logout: {
        marginTop: "10%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#CBD5E1',
        alignItems: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 25,
        gap: 10,
    },
    name: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        width: '90%',
        backgroundColor: '#CBD5E1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pencilIcon: {
        width: 20,
        height: 20,
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        width: '90%',
        backgroundColor: '#CBD5E1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 0,
    },
    moreContent: {
        width: '65%',
        borderRadius: 15,
        justifyContent: 'center',
        backgroundColor: '#0F172A',
    },
    crownIcon: {
        width: 20,
        height: 20,
    },
});
