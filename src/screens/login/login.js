import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import RouterApi from '../../utils/router_api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Client from '../store/cliente';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import GIFPlayer from 'react-native-gif';
import { auth, db, firebaseApp } from '../../utils/firebase_config';
import * as firebase from 'firebase/app'
import CourseProgramming from '../store/course_programming';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingCourses, setLoadingCourses] = useState(false);

    const navigation = useNavigation();


    const loginUser = async () => {
        try {
            setLoadingCourses(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            Client.setUid(userCredential.user.uid);
            const userData = Client.uid;
            await AsyncStorage.setItem('uid', JSON.stringify(userData));

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
            setLoadingCourses(false);
            navigation.navigate("Main");
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
        <SafeAreaView style={{ height: "100%" }}>
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
                        <View style={{ marginTop: 70, marginBottom: 20 }}>
                            <TouchableOpacity style={styles.loginButton} onPress={() => loginUser()}>
                                <Text style={styles.buttonText}>Entrar</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <TouchableOpacity onPress={goToForgotPassword} >
                        <Text style={{ textAlign: "center", fontSize: 20 }}>Esqueci a senha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToRegister} style={{ marginTop: 8 }}>
                        <Text style={{ textAlign: "center", fontSize: 20 }}>Cadastrar</Text>
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
        backgroundColor: "rgba(0,0,0,1)",
    },
    spinner: {
        width: 100,
        height: 100,
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
        fontSize: 24,
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
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginTop: 5,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: "#3B82F6",
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 8,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    googleButton: {
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderColor: "#EA4335",
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: "row",
    },
});
