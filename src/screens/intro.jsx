import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, useColorScheme, TouchableOpacity } from 'react-native';
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

                    <Image style={{ width: 320, height: 500 }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobitoIntroScreen.png?alt=media&token=9b49ed84-c0b9-417f-be73-a596ea039dd7" }} />
                </View>

                <View >
                    <TouchableOpacity style={[styles.buttonIntro, { marginHorizontal: 20, backgroundColor: "#0F172A" }]} onPress={() => { navigation.navigate('Login') }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>Fazer Login</Text>
                        </View>
                    </TouchableOpacity>


                    <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 15, textAlign: "center" }}>OU</Text>
                    <TouchableOpacity style={[styles.buttonIntro, { marginTop: 15, marginHorizontal: 20, backgroundColor: "#3B82F6" }]} onPress={() => { navigation.navigate('Step1Onboard') }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>Cadastrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default IntroScreen;