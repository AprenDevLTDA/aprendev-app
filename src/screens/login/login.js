import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import PerfilButtonComponent from '../components/button/perfil_button.component';
import RouterApi from '../../utils/router_api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Client from '../store/cliente';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import GIFPlayer from 'react-native-gif';
import { auth, db } from '../../utils/firebase_config';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from "expo-auth-session/providers/google";
import { generateHexStringAsync } from 'expo-auth-session';
import CourseProgramming from '../store/course_programming';
import ForgotPassword from '../login/forgotPassword'
import ModalLobito from '../components/modal/modal';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const navigation = useNavigation();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: "282887853209-o2iia9kck6hbgij2595nccm1q8ehn34b.apps.googleusercontent.com",
        extraParams: {
            nonce: generateHexStringAsync(16),
        },
        usePKCE: true
    });

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
                            Client.setCharacters(dataVal.characters);
                            Client.setChar(dataVal.char);


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
    useEffect(() => {
        if (focusedInput === "email") validateEmail();
    }, [email]);
    useEffect(() => {
        if (focusedInput === "password") validatePassword();

    }, [password]);


    const validatePassword = () => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(password);
        if (password === "") {
            setErrorMessagePassword("Preencha sua senha");
        } else if (!strongPasswordRegex) {
            setErrorMessagePassword("Sua senha não atende aos requisitos");
        } else {
            setErrorMessagePassword("");
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

    const validate = () => {
        validateEmail();
        validatePassword();

        if (errorMessageEmail || errorMessagePassword) {
            setErrorMessage("Putz, parece que você não preencheu todos os campos corretamente.");
            setShowModal(true);
            return;
        }

        loginUser();
    };


    const loginUser = async () => {
        try {
            setLoadingCourses(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            Client.setUid(userCredential.user.uid);
            const userData = Client.uid;
            await AsyncStorage.setItem('uid', JSON.stringify(userData));

            const data = await RouterApi.get(`/aprendev/clients/${Client.uid}`);
            const dataVal = data.val();
            Client.setCoins(dataVal.coins);
            Client.setName(dataVal.name);
            Client.setEmail(dataVal.email);
            Client.setNivel(dataVal.level);
            Client.setHeart(dataVal.heart);
            Client.setSelos(dataVal.emblems);
            Client.setCharacters(dataVal.characters);
            Client.setChar(dataVal.char);

            Client.setIsUserLoggedIn(true);
            setLoadingCourses(false);
            navigation.navigate('Main');
        } catch (error) {
            setLoadingCourses(false);
            console.log(error);
            // Verificar o tipo de erro retornado pelo Firebase
            setErrorMessage('Problema com a autenticação na base de dados!');
            setShowModal(true);

        }

    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const goToForgotPassword = () => {
        // Navigate to forgot password screen
    };

    const goToRegister = () => {
        navigation.navigate("Step1Onboard")
    };

    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: "#E2E8F0" }}>
            {loadingCourses && (
                <View style={styles.spinnerContainer}>
                    <GIFPlayer
                        style={styles.spinner}
                        source={require('../../../assets/cabeca_1.gif')}
                        resizeMode='cover'
                    />
                </View>
            )}
            {!loadingCourses && (
                <ScrollView>
                    <ModalLobito
                        visible={showModal}
                        btnName={"Beleza, LobITo"}
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
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <View style={{ paddingRight: 100, paddingTop: 40, paddingLeft: 20 }}>
                                <Icon name="arrow-back" size={30} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.containerLine}>
                        <Text style={styles.line}></Text>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}><Text style={styles.label_aster}>*</Text> E-mail</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}

                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                        />
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
                        <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }} >
                            <Text style={{ textAlign: "center", fontSize: 16, color: "#1E293B", fontWeight: "700", paddingTop: 15, marginLeft: -230 }}>Esqueci a senha</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 30, marginBottom: 20 }}>
                            <TouchableOpacity style={styles.loginButton} onPress={validate}>
                                <Text style={[styles.buttonText, { color: "#FFF" }]}>Entrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                                <Image style={{ width: 30, height: 30 }} source={require('../../../assets/google.png')} />
                                <Text style={styles.buttonText}>Entrar com Google</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={goToRegister} style={{ marginTop: 8 }}>
                        <Text style={{ textAlign: "center", fontSize: 25, color: "#3B82F6", fontWeight: "700" }}>Cadastrar</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

export default Login;


const styles = StyleSheet.create({
    spinnerContainer: {
        position: 'absolute',
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0F172A",
    },
    spinner: {
        width: 150,
        height: 150,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    image: {
        width: 150,
        height: 50,
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
    },
    containerLine: {
        alignItems: 'center',
    },
    line: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        width: 100,
        marginTop: 5,
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    label: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    label_aster: {
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
    },
    loginButton: {
        borderWidth: 2,
        borderColor: "#3B82F6",
        padding: 10,
        backgroundColor: "#3B82F6",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 8,
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
        marginLeft: 8
    },
    googleButton: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: 8,
        borderColor: "#3B82F6",
        borderWidth: 2.5,
        borderStyle: 'solid',
        flexDirection: "row",
    },
});
