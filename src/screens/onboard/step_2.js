import React, { useState, useEffect } from 'react';

import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import styles from './styles/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Cliente from '../store/cliente';
import CustomCheckBox from '../components/checkbox/custom_check_box';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado este paquete si lo estás utilizando
import RouterApi from '../../utils/router_api';
import { createUserWithEmailAndPassword, } from 'firebase/auth';
import { auth } from '../../utils/firebase_config';
import { observer } from 'mobx-react-lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalLobito from '../components/modal/modal';
import GIFPlayer from 'react-native-gif';


const Step2Onboard = observer(() => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(false);

    nexStep = async () => {
        try {
            setLoadingCourses(true);
            if (!Cliente.nivel) {
                setLoadingCourses(false);
                setModalVisible(true);
                return;
            }

            Cliente.setHeart(5);
            Cliente.setCoins(500);
            Cliente.setChar("https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/Perfil_Padrao.png?alt=media&token=6f1447a8-703d-4c3c-a29a-44e883d89d6b");
            Cliente.setCharacters(["https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/Perfil_Padrao.png?alt=media&token=6f1447a8-703d-4c3c-a29a-44e883d89d6b"]);

            if (Cliente.uid === "") {
                const userCredential = await createUserWithEmailAndPassword(auth, Cliente.email, Cliente.password)
                const user = userCredential.user;
                Cliente.setUid(user.uid);
            }

            const body = {
                [Cliente.uid]: {
                    name: Cliente.name,
                    email: Cliente.email,
                    level: Cliente.nivel,
                    heart: Cliente.heart,
                    coins: Cliente.coins,
                    char: Cliente.char,
                    characters: Cliente.characters
                }
            };

            RouterApi.patch("/aprendev/clients", body);
            const userData = Cliente.uid;
            await AsyncStorage.setItem('uid', JSON.stringify(userData));
            Cliente.setIsUserLoggedIn(true);
            navigation.navigate('Main');
            setLoadingCourses(false);

        } catch (error) {
            console.error('Erro na solicitação:', error.message);
        }
    }
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            {loadingCourses && (
                <View style={{
                    position: 'absolute',
                    height: "100%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#0F172A"
                }}>
                    <GIFPlayer
                        style={{
                            width: 150,
                            height: 150,
                        }}
                        source={require('../../../assets/cabeca_1.gif')}
                        resizeMode='cover'
                    />
                </View>
            )}
            {!loadingCourses && (
                <ScrollView>
                    <ModalLobito
                        btnName={"Beleza, LobITo!"}
                        imagem={"https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/warning.png?alt=media&token=c14850b0-9bfe-4730-9757-0b63edd4f532"}
                        onClose={() => setModalVisible(false)}
                        onPress={() => setModalVisible(false)}
                        titulo={"Por favor, selecione seu nível de conhecimento!"}
                        visible={modalVisible}
                        visibleCloseBottom={true}

                    />
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Step1Onboard') }}>
                            <View style={{ paddingRight: 100, paddingTop: 40, paddingLeft: 20 }}>

                                <Icon name="arrow-back" size={30} color="#000" />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40 }}>
                            <Image style={styles.image} source={require('../../../assets/logo.png')} />
                        </View>
                    </View>
                    <Text style={[styles.title, { fontSize: 20 }]}>Para conhecer melhor o seu Perfil</Text>
                    <View style={styles.containerLine}>
                        <Text style={styles.line}></Text>
                    </View>
                    <Text style={styles.description}>{Cliente.name}, Qual o seu nível de{'\n'} conhecimento em programação?</Text>
                    <View style={styles.containerCheckbox}>
                        <CustomCheckBox />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.nexStep}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>)}
        </SafeAreaView>


    )


});
export default Step2Onboard;
