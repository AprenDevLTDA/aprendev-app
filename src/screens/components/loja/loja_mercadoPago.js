import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Card, Button } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { VidaExtra } from './object/VidaExtra';
import { Cachorro } from './object/BonecoVermelho';
import CardComponent from './card';
import Navbar from '../navBar/navBar';
import ModalLobito from '../modal/modal';
import CourseProgramming from '../../store/course_programming';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RouterApi from '../../../utils/router_api';
import Client from '../../store/cliente';
const BonecoVermelho = require('../../../../assets/boneco_vermelho.png');
const BonecoAzul = require('../../../../assets/boneco_azul.png');
const BonecoVerde = require('../../../../assets/boneco_verde.png');
const BonecoAmarelo = require('../../../../assets/boneco_amarelo.png');
const Monetization = require('../../../../assets/monetization.png');

export default LojaMercadoPagoScreen = observer(() => {

    const [shop, setShop] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [visibleHearth, setModalVisibleHearth] = useState(false);

    const [modalContent, setModalContent] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            async function fetchData() {
                const dataC = await RouterApi.get('/aprendev/mercadoPago_Shop');
                const ShopData = dataC.val() || {};


                const setShopArray = Object.keys(ShopData).map(key => ShopData[key]);
                setShop(setShopArray);
            }

            fetchData();
        }, [])
    );
    const handleChangeName = () => {
        CourseProgramming.setModalVisible(false);
    }
    const navigation = useNavigation();
    const showModal = (imagem, btnName, titulo, onPress) => {
        setModalContent({
            visible: true,
            imagem,
            btnName,
            titulo,
            onPress
        });
        setModalVisible(true);
    };

    const showModalSuccess = () => {
        showModal(

            "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito.png?alt=media&token=7838c7c8-578a-4164-b919-a80749c1a881",
            "Fechar",
            "Parabéns! Você comprou o produto com sucesso!",
            () => { setModalVisible(false) }

        )
    }

    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: "#E2E8F0"
        }]}>
            <Navbar />

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {CourseProgramming.modalVisible && (
                    <ModalLobito onPress={() => CourseProgramming.setModalVisible(false)} visible={CourseProgramming.modalVisible} imagem={"https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/LobitoCoin.png?alt=media&token=3c116342-67fa-41c2-ad56-fd0605dc759c"} btnName={"Oba LobITo"} visibleCloseBottom={true} onClose={() => CourseProgramming.setModalVisible(false)} titulo={"Parabens"} />
                )}
                {CourseProgramming.modalVisibleError && (
                    <ModalLobito onPress={() => CourseProgramming.setModalVisible(false)} visible={CourseProgramming.modalVisibleError} imagem={"https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/mascotetriste.png?alt=media&token=ef78b123-8575-46b6-933e-9add64e1a56b"} btnName={"Tente novamente!"} visibleCloseBottom={true} onClose={() => CourseProgramming.setModalVisibleError(false)} titulo={"Não foi dessa vez"} />
                )}
                <View style={{ flex: 1, flexDirection: "row", marginBottom: 25 }}>
                    <TouchableOpacity onPress={() => {


                        navigation.goBack()

                    }}>
                        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                            <Icon name="arrow-back" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20 }}>Lojinha de coins</Text>
                    </View>
                </View>


                {modalVisible && (

                    <ModalLobito
                        width={150}
                        height={150}
                        onClose={() => {
                            setModalVisible(false)
                        }}
                        visibleCloseBottom={true}
                        visible={modalVisible}
                        onPress={modalContent.onPress}
                        imagem={modalContent.imagem}
                        btnName={modalContent.btnName}
                        titulo={modalContent.titulo}
                    />
                )}

                <View style={{
                    flexDirection: 'row',
                    flexWrap: "wrap",
                    justifyContent: 'center',
                    alignItems: "center",
                    alignSelf: "center"
                }}>


                    {shop.map((element, index) => {

                        return (
                            <View key={index}>
                                <Card
                                    onPress={() => navigation.navigate('Checkout', { info: element })}

                                    style={styles.outerCard}


                                >
                                    <View style={[styles.innerCardContent, styles.innercardGrande]}>
                                        <Image
                                            style={styles.logo}
                                            source={{ uri: element.imageSource }}
                                        />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.textoCardGrande}>{element.title}</Text>
                                            <View style={styles.subtitulo}>
                                                <Text>R$ {element.price
                                                },00</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card></View>
                        );
                    })}

                </View>

            </ScrollView>
        </SafeAreaView>
    );

}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',

    },
    scrollViewContent: {
        alignItems: 'center',
        paddingVertical: 20,
        width: "100%"
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    outerCard: {
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: '2%',
        borderColor: '#94A3B8',
        margin: 10,
        backgroundColor: '#94A3B8',
        alignItems: 'center',
        width: 320
    },
    innerCardContent: {
        borderRadius: 5,
        paddingHorizontal: '10%',
        paddingVertical: 5,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#CBD5E1',
        alignItems: 'center',
        width: 300
    },
    innercardGrande: {
        flexDirection: 'row',
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    logo: {
        marginRight: '20%',
        width: 39,
        height: 50,
    },
    textoCardGrande: {
        fontSize: 20,

    },
    textoCardMedio: {
        fontSize: 14,
        textAlign: 'center',
        width: 90,
    },
    subtitulo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        textAlign: 'center',
    },
    radioForm: {
        marginHorizontal: 5,
        marginTop: 15,
        width: '100%',
        justifyContent: 'center',
    },
});
