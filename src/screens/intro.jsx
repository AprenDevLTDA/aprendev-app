import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './onboard/styles/style';
import { auth } from '../utils/firebase_config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const IntroScreen = () => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    return (
        <View style={{ backgroundColor: colorScheme === "dark" ? "#1E293B" : "#e2e8f0", height: "100%" }}>
            <ScrollView>
                <View style={{
                    flexDirection: 'row', // Isso alinha os botões horizontalmente
                    justifyContent: 'center', // Isso centraliza os botões horizontalmente no container
                    marginTop: 20,

                }}>


                    <Image style={{ marginTop: 70 }} source={require('../../assets/logo.png')} />

                </View>

                <View >

                    <Text style={{ textAlign: "center", marginBottom: 10, fontSize: 15, marginTop: 60 }}>Um slogan legal para o aplicativo!</Text>
                    <Text style={{ textAlign: "center", marginBottom: 70, fontSize: 15, marginTop: 60 }}>Como gostaria de começar?</Text>
                    <View style={styles.buttonIntro}>
                        <Button onPress={() => { navigation.navigate('Login') }} title='Fazer Login' color={"#0F172A"} />
                    </View>
                    <Text style={{ textAlign: "center" }}>Ou</Text>
                    <View style={styles.buttonIntro}>
                        <Button onPress={async () => {
                            const userJson = await AsyncStorage.getItem('uid');

                            console.log(userJson);
                            navigation.navigate('Step1Onboard')
                        }} title='Cadastrar' color={"#3B82F6"} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
export default IntroScreen;