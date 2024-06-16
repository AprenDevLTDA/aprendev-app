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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingCourses, setLoadingCourses] = useState(false);

    const navigation = useNavigation();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        androidClientId: "282887853209-h1rkuipq212j8n1foda3r16g5fqkqome.apps.googleusercontent.com",
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
            console.error('Login error:', error);
            Alert.alert('Erro', error.message);
        }
    };

    const goToForgotPassword = () => {
        // Navigate to forgot password screen
    };

    const goToRegister = () => {
        // Navigate to registration screen
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
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => { navigation.navigate('IntroScreen') }}>
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
                        />
                        <Text style={styles.label}><Text style={styles.label_aster}>*</Text> Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }} >
                            <Text style={{ textAlign: "center", fontSize: 16, color: "#3B82F6", fontWeight: "700", paddingTop: 15, marginLeft: -230 }}>Esqueci a senha</Text>
                        </TouchableOpacity>

                        <View style={{ marginTop: 30, marginBottom: 20 }}>
                            <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
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
