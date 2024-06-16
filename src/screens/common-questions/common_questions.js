import React, { useState } from 'react';
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
import RouterApi from '../../utils/router_api';



const PF = require('../../../assets/faq.png');


export default Faq = observer(() => {
    const navigation = useNavigation();
    const [faq, setFaq] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            async function fetchData() {
                const dataC = await RouterApi.get('/aprendev/faq');
                const FaqData = dataC.val() || {};


                const setFaqArray = Object.keys(FaqData).map(key => FaqData[key]);
                setFaq(setFaqArray);
            }

            fetchData();
        }, [])
    );
    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: "#E2E8F0"
        }]}>
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
                        <Text style={{ fontSize: 20 }}>Perguntas Frequentes</Text>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 20,
                    gap: 10,
                    marginBottom: 80,
                }}>
                    {faq.map((element, index) => (

                        <PerfilButtonComponent
                            key={index}
                            texto={`${element[0]}`}
                            sourceImage={PF}

                        >
                            <View key={index}>
                                <Text>
                                    {element[1]}
                                </Text>
                            </View>
                        </PerfilButtonComponent>
                    ))}

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
