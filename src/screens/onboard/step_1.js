import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import PerfilButtonComponent from '../components/button/perfil_button.component';
import styles from './styles/style';
import RouterApi from '../../utils/router_api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Client from '../store/cliente';
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateHexStringAsync } from 'expo-auth-session';
import GIFPlayer from 'react-native-gif';
import { auth } from '../../utils/firebase_config';
import ModalLobito from '../components/modal/modal';

const Step1Screen = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageUsername, setErrorMessageUsername] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [loadingCourses, setLoadingCourses] = useState(false);

    const emailAA = require("../../../assets/email.png");
    const google = require("../../../assets/google.png");





    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: "282887853209-h1rkuipq212j8n1foda3r16g5fqkqome.apps.googleusercontent.com",
        extraParams: {
            nonce: generateHexStringAsync(16),
        },
        usePKCE: true
    });
    const navigation = useNavigation();

    useEffect(() => {
        if (focusedInput === 'username') validateUsername();
    }, [name]);

    useEffect(() => {
        if (focusedInput === "email") validateEmail();
    }, [email]);

    useEffect(() => {
        if (focusedInput === "password") validatePassword();

    }, [password]);

    useEffect(() => {
        if (focusedInput === "aaaaaaaaaaaaaaaaaaaa") validateConfirmPassword();
    }, [confirmPassword])

    const validateUsername = () => {
        if (name === "") {
            setErrorMessageUsername("Preencha seu username");
        } else {
            setErrorMessageUsername("");
        }
    };

    const validateEmail = () => {
        const strongEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (email === "") {
            setErrorMessageEmail("Preencha seu email");
        } else if (!strongEmailRegex) {
            setErrorMessageEmail("Insira um email válido");
        } else {
            setErrorMessageEmail("");
        }
    };

    const validatePassword = () => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
        if (password === "") {
            setErrorMessagePassword("Preencha sua senha");
        } else if (!strongPasswordRegex) {
            setErrorMessagePassword("Sua senha não atende aos requisitos");
        } else {
            setErrorMessagePassword("");
        }
    };

    const validateConfirmPassword = () => {
        if (confirmPassword === "") {
            setErrorMessageConfirmPassword("Confirme sua senha");
        } else if (confirmPassword !== password) {
            setErrorMessageConfirmPassword("As senhas são diferentes");
        } else {
            setErrorMessageConfirmPassword("");
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    async function signInWithGoogle() {
        try {
            await promptAsync();
        } catch (error) {
            console.error('Google sign-in error:', error);
            Alert.alert('Erro', 'Falha na autenticação com Google.');
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const handleGoogleSignIn = async () => {
                if (response?.type === 'success') {
                    setLoadingCourses(true);
                    const { id_token, accessToken } = response.params;
                    const credential = GoogleAuthProvider.credential(id_token, accessToken);
                    try {
                        const userCredential = await signInWithCredential(auth, credential)
                        const userSnapshot = await RouterApi.get(`/aprendev/clients/${userCredential.user.uid}`)

                        if (userSnapshot && userSnapshot.val() !== null) {
                            const dataVal = userSnapshot.val();
                            Client.setUid(userCredential.user.uid);
                            const userData = Client.uid;
                            await AsyncStorage.setItem('uid', JSON.stringify(userData));
                            Client.setCoins(dataVal.coins);
                            Client.setName(dataVal.name);
                            Client.setEmail(dataVal.email);
                            Client.setNivel(dataVal.level);
                            Client.setHeart(dataVal.heart);
                            Client.setSelos(dataVal.emblems);
                            Client.setChar(dataVal.char);
                            Client.setCharacters(dataVal.characters);

                            Client.setIsUserLoggedIn(true);
                            setLoadingCourses(false);
                            navigation.navigate("Main");
                        } else {
                            Client.setUid(userCredential.user.uid);
                            Client.setEmail(userCredential.user.email);
                            Client.setName(userCredential.user.displayName);
                            setLoadingCourses(false);
                            navigation.navigate("Step2Onboard");

                        }

                    } catch (error) {
                        console.error('Firebase sign-in error:', error);
                        Alert.alert('Erro', 'Falha na autenticação com Firebase.');
                    }
                } else {
                    console.log("DEU MERDa ");
                    console.log(response?.type);
                }
            };

            handleGoogleSignIn();
        }, [response])
    );

    const loginRedirect = () => {
        navigation.navigate('Login');
    };

    const validate = () => {
        validateUsername();
        validateEmail();
        validatePassword();
        validateConfirmPassword();

        if (errorMessageUsername || errorMessageEmail || errorMessagePassword || errorMessageConfirmPassword) {
            setErrorMessage("Putz, parece que você não preencheu todos os campos corretamente.");
            setShowModal(true);
            return;
        }

        nexStep();
    };

    const nexStep = () => {
        Client.setName(name);
        Client.setEmail(email);
        Client.setPassword(password);
        navigation.navigate('Step2Onboard');
    };

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
                    backgroundColor: "#0F172A",
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
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={{ paddingRight: 100, paddingTop: 40, paddingLeft: 20 }}>
                                <Icon name="arrow-back" size={30} color="#000" />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40 }}>
                            <Image style={styles.image} source={require('../../../assets/logo.png')} />
                        </View>
                    </View>
                    <ModalLobito
                        visible={showModal}
                        btnName={"Beleza LobITo"}
                        onClose={() => {
                            setShowModal(false)
                        }}
                        visibleCloseBottom={true}
                        titulo={errorMessage}
                        onPress={() => {
                            setShowModal(false)
                        }}
                        imagem={"https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito_aviso.png?alt=media&token=a87a3129-6ffa-4fd2-9213-308656eef1f8"}
                    />
                    <Text style={styles.title}>Cadastro</Text>
                    <View style={styles.containerLine}>
                        <Text style={styles.line}></Text>
                    </View>
                    <Text style={[styles.description]}>Faça o cadastro e{'\n'} comece a programar  agora!</Text>
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <PerfilButtonComponent
                            showIcon={false}
                            sourceImage={emailAA}
                            texto={"Cadastrar com E-mail e Senha"}
                            padding={10}
                            borderWidth={2}
                        >
                            <Text style={styles.label}><Text style={styles.label_aster}>*</Text> Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                onChangeText={setName}
                                onFocus={() => setFocusedInput('username')}
                                onBlur={() => setFocusedInput(null)} />
                            {errorMessageUsername !== '' && <Text style={{
                                color: '#3B82F6',
                                fontWeight: '700',
                                marginTop: 5,
                            }}>{errorMessageUsername}</Text>}

                            <Text style={styles.label}><Text style={styles.label_aster}>*</Text> E-mail</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="E-mail"
                                keyboardType="email-address"
                                onChangeText={setEmail}
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput(null)} />
                            {errorMessageEmail !== '' && <Text style={{
                                color: '#3B82F6',
                                fontWeight: '700',
                                marginTop: 5,
                            }}>{errorMessageEmail}</Text>}
                            <Text style={styles.label}><Text style={styles.label_aster}>*</Text> Senha</Text>
                            <View style={[styles.input, { flexDirection: "row", alignItems: "center" }]}>
                                <TextInput
                                    style={{ width: "92%" }} placeholder="Senha"
                                    passwordRules={true}
                                    secureTextEntry={!showPassword}
                                    onChangeText={setPassword}
                                    onFocus={() => setFocusedInput("password")}
                                    onBlur={() => setFocusedInput(null)} />
                                <Icon name={!showPassword ? "visibility-off" : "visibility"} size={25} color={"#0F172A"} onPress={toggleShowPassword} />
                            </View>
                            {errorMessagePassword !== '' && <Text style={{
                                color: '#3B82F6',
                                fontWeight: '700',
                                marginTop: 5,
                            }}>{errorMessagePassword}</Text>}
                            <Text style={styles.label}><Text style={styles.label_aster}>*</Text> Confirmar Senha</Text>


                            <View style={[styles.input, { flexDirection: "row", alignItems: "center" }]}>
                                <TextInput
                                    style={{ width: "92%" }}
                                    placeholder="Confirmar Senha"
                                    passwordRules={true}
                                    secureTextEntry={!showConfirmPassword}
                                    onChangeText={setConfirmPassword}
                                    onFocus={() => setFocusedInput('aaaaaaaaaaaaaaaaaaaa')}
                                    onBlur={() => setFocusedInput(null)} />
                                <Icon name={!showConfirmPassword ? "visibility-off" : "visibility"} size={25} color={"#0F172A"} onPress={toggleShowConfirmPassword} />
                            </View>


                            {errorMessageConfirmPassword !== '' && <Text style={{
                                color: '#3B82F6',
                                fontWeight: '700',
                                marginTop: 5,
                            }}>{errorMessageConfirmPassword}</Text>}


                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={validate}>
                                    <Text style={styles.buttonText}>Avançar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button2} onPress={loginRedirect}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </PerfilButtonComponent>
                    </View>
                    <PerfilButtonComponent
                        borderWidth={2.5}
                        showIcon={false}
                        google={true}
                        googlePress={() => signInWithGoogle()}
                        expandable={false}
                        borderColor={"#3B82F6"}
                        texto={"Cadastrar com o google"}
                        padding={10}
                        sourceImage={google}
                        backgroundColor={"transparent"}
                    >
                    </PerfilButtonComponent>
                    <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }} onPress={loginRedirect}>
                        <Text style={{ textAlign: "center", fontSize: 25, color: "#3B82F6", fontWeight: "700" }}>Login</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default Step1Screen;
