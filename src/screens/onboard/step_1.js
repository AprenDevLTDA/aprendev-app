import React, { useState } from 'react';

import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import styles from './styles/style';
import RouterApi from '../../utils/router_api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Client from '../store/cliente';
import axios from 'axios';
import { ImagePickerIOS } from 'react-native';
import { observer } from 'mobx-react';


const Step1Screen = () => {
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");


    loginRedirect = () => {
        navigation.navigate('Login');

    }
    nexStep = () => {
        Client.setName(name);
        Client.setEmail(email);
        Client.setPassword(password);
        navigation.navigate('Step2Onboard');
    }

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>

                <View style={styles.container}>
                    <TouchableOpacity onPress={() => { navigation.navigate('IntroScreen') }}>
                        <View style={{ paddingRight: 100, paddingTop: 40, paddingLeft: 20 }}>

                            <Icon name="arrow-back" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40 }}>
                        <Image style={styles.image} source={require('../../../assets/logo.png')} />
                    </View>
                </View>
                <Text style={styles.title}>Cadastro</Text>
                <View style={styles.containerLine}>
                    <Text style={styles.line}></Text>
                </View>
                <Text style={styles.description}>Faça o cadastro e{'\n'} comece a programar  agora!</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.label}><Text style={styles.label_aster}>*</Text> Username</Text>
                    <TextInput style={styles.input} placeholder="Username" onChangeText={setName} />

                    <Text style={styles.label}><Text style={styles.label_aster}>*</Text> E-mail</Text>
                    <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail} />

                    <Text style={styles.label}><Text style={styles.label_aster}>*</Text> Senha</Text>
                    <TextInput style={styles.input} placeholder="Senha" passwordRules={true} secureTextEntry={true} onChangeText={setPassword} />

                    <Text style={styles.label}><Text style={styles.label_aster}>*</Text> Confirmar Senha</Text>
                    <TextInput style={styles.input} placeholder="Confirmar Senha" passwordRules={true} secureTextEntry={true} onChangeText={setConfirmPassword} />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.nexStep}>
                            <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={this.handleSecondButtonPress}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View>
                    <TouchableOpacity onPress={this.loginRedirect}>
                        <Text style={{ textAlign: "center", fontSize: 20 }}>Login</Text>
                    </TouchableOpacity></View>
            </ScrollView>
        </SafeAreaView>


    )


}
export default Step1Screen;
