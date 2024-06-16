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
import { Card } from 'react-native-paper';
import { observer } from 'mobx-react-lite';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { VidaExtra } from './object/VidaExtra';
import CardComponent from './card';
import Navbar from '../navBar/navBar';
import ModalLobito from '../modal/modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RouterApi from '../../../utils/router_api';
import Client from '../../store/cliente';

export default LojaScreen = observer(() => {

    const [shop, setShop] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [modalContent, setModalContent] = useState({});
    useFocusEffect(
        React.useCallback(() => {
            async function fetchData() {
                const dataC = await RouterApi.get('/aprendev/shop');
                const ShopData = dataC.val() || {};


                const setShopArray = Object.keys(ShopData).map(key => ShopData[key]);
                setShop(setShopArray);
            }

            fetchData();
        }, [])
    );

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


    const buyProductAvatar = async (product, point) => {
        const character = product;
        const productPath = `aprendev/clients/${Client.uid}`;

        try {
            // Leia o valor atual do selo
            const currentDataSnapshot = await RouterApi.get(productPath);

            // Verifica se existe algum dado no caminho
            const currentData = currentDataSnapshot ? currentDataSnapshot.val() : {};

            // Verifica se existe a propriedade 'selos' e garante que é um array
            const characters = currentData.characters ? currentData.characters : [];
            const points = Client.coins - point;

            const updatedData = {
                ...currentData,
                characters: [...characters, character],
                coins: points

            };

            // Atualiza o valor no banco de dados
            await RouterApi.patch(productPath, updatedData);

            // Atualiza o estado do cliente localmente
            Client.setCharacters([...characters, character]);
            Client.setCoins(points);

            setModalVisible(false);

        } catch (error) {
            console.error("Error updating badge:", error);
        }
    }
    const UpdateHeart = async (heartUp, point) => {
        const heart = Client.heart + heartUp;
        const points = Client.coins - point;
        const body = {
            heart: heart,
            coins: points
        }
        await RouterApi.patch(`/aprendev/clients/${Client.uid}`, body)
        Client.setHeart(heart);
        Client.setCoins(points);

        setModalVisible(false);
        showModalSuccess();
    }

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
                <View style={{ flex: 1, flexDirection: "row", marginBottom: 25 }}>
                    <TouchableOpacity onPress={() => {


                        navigation.goBack()

                    }}>
                        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                            <Icon name="arrow-back" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20 }}>Lojinha aprendev</Text>
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




                <View style={styles.cardContainer}>
                    {shop.map((element, index) => {
                        if (element.imageSource === "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/icon_vida.png?alt=media&token=9241e05b-d75d-476f-9852-30ddba43f975") {

                            return (
                                <View key={index}>
                                    <Card
                                        style={styles.outerCard}
                                        onPress={() =>
                                            Client.heart + element.quantity > 5 ?
                                                showModal(
                                                    "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito.png?alt=media&token=7838c7c8-578a-4164-b919-a80749c1a881", "Beleza LobITo!", `Você não pode comprar mais nenhum pacote de Vida extra!, pois com esse pacote de ${element.quantity} vai dar o limite de Vida pra você`, () => setModalVisible(false)) : Client.heart === 5 ? showModal("https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito.png?alt=media&token=7838c7c8-578a-4164-b919-a80749c1a881",
                                                        "Beleza LobITo!",
                                                        `Você não pode comprar mais nenhum pacote de Vida extra!, pois ja deu o limite de Vida pra você`,
                                                        () => setModalVisible(false)) :
                                                    Client.coins <= 0 ?
                                                        showModal(
                                                            "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito_triste.png?alt=media&token=87386c8f-84e2-4f4e-b7e3-e9088e343341",
                                                            "Comprar Moedas!",
                                                            `Poxa! Você esta sem moedas!!, Compre mais clicando no botão logo abaixo!!`,
                                                            () => setModalVisible(false)) :
                                                        Client.coins >= element.points ?
                                                            showModal(
                                                                element.imageSource,
                                                                "Sim!!",
                                                                `Você esta preste a comprar ${element.title}. Deseja Prosseguir?`,
                                                                () => UpdateHeart(element.quantity, element.points)) :
                                                            showModal(
                                                                "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito_aviso.png?alt=media&token=a87a3129-6ffa-4fd2-9213-308656eef1f8",
                                                                "Comprar Moedas!",
                                                                `Você não tem coins o sufuciente, você tem somente ${Client.coins} coins!, compre mais acessando o botão abaixo`,
                                                                () => setModalVisible(false))}
                                    >
                                        <View style={[styles.innerCardContent, styles.innercardGrande]}>
                                            <Image
                                                style={styles.logo}
                                                source={{ uri: element.imageSource }}
                                            />
                                            <View style={styles.textContainer}>
                                                <Text style={styles.textoCardGrande}>{element.title}</Text>
                                                <View style={styles.subtitulo}>
                                                    <Image source={VidaExtra.monetizationImage} />
                                                    <Text>{element.points
                                                    }</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Card></View>)
                        } else {
                            const isPurchased = Client.characters.includes(element.imageSource);
                            return (
                                <View key={index}>
                                    <TouchableOpacity
                                        onPress={!isPurchased ? () => {
                                            if (Client.coins <= 0) {
                                                showModal(
                                                    "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito_triste.png?alt=media&token=87386c8f-84e2-4f4e-b7e3-e9088e343341",
                                                    "Comprar Moedas!",
                                                    `Poxa! Você esta sem moedas!!, Compre mais clicando no botão logo abaixo!!`,
                                                    () => setModalVisible(false)
                                                );
                                            } else if (Client.coins >= element.points) {
                                                showModal(
                                                    element.imageSource,
                                                    "Beleza LobITo!",
                                                    `Você esta preste a comprar ${element.title}. Deseja Prosseguir?`,
                                                    () => buyProductAvatar(element.imageSource, element.points)
                                                );
                                            } else {
                                                showModal(
                                                    "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/lobito_aviso.png?alt=media&token=a87a3129-6ffa-4fd2-9213-308656eef1f8",
                                                    "Comprar Moedas!",
                                                    `Você não tem coins o suficiente, você tem somente ${Client.coins} coins!, compre mais acessando o botão abaixo`,
                                                    () => setModalVisible(false)
                                                );
                                            }
                                        } : null}
                                    >
                                        <CardComponent
                                            name={element.title}
                                            imageNull={false}
                                            sourceImage={element.imageSource}
                                            sourceImage2={element.monetizationImage}
                                            price={isPurchased ? "Comprado" : element.points}
                                        />
                                    </TouchableOpacity>
                                </View>
                            );
                        }
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
        width: 59,
        height: 59,
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
