import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from '../../onboard/styles/style';
import ModalLobito from '../modal/modal';
import Client from '../../store/cliente';

const CardCourse = ({ redirect, aula = "", module = "", title, data_nivel, width = 333, height = 86 }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const showModal = (imagem, titulo, btnName) => {
        setModalContent({
            visible: true,
            imagem,
            titulo,
            btnName,

            onPress: () => setModalVisible(false),
        });
        setModalVisible(true);
    };

    const handlePress = () => {
        if (Client.heart === 0) {
            showModal(
                "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/mascotetriste.png?alt=media&token=ef78b123-8575-46b6-933e-9add64e1a56b",
                "Poxa, você não pode realizar essa tarefa... Suas vidas acabaram",
                "Beleza, LobITo!"
            );
            return;
        }

        if (module === "close") {
            showModal(
                "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/warning.png?alt=media&token=c14850b0-9bfe-4730-9757-0b63edd4f532",
                "Tsc, tsc, você precisa concluir o nível anterior",
                "Beleza, LobITo!"
            );
            return;
        }
        if (aula === "close") {
            showModal(
                "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/warning.png?alt=media&token=c14850b0-9bfe-4730-9757-0b63edd4f532",
                "Ops, parece que você ainda não pode acessar essa aula...",
                "Beleza, LobITo!"
            );
            return;
        }
        if (aula !== "close" || module !== "close") {
            navigation.navigate(redirect, data_nivel);

        }
    };

    return (
        <>
            {modalVisible && (
                <ModalLobito
                    visible={modalVisible}
                    onPress={modalContent.onPress}
                    imagem={modalContent.imagem}
                    btnName={modalContent.btnName}
                    titulo={modalContent.titulo}
                />
            )}
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.container}>
                    <View style={[stylesCard.cardContainer, { width, height }]}>
                        <View style={stylesCard.innerContainer}>
                            <View style={stylesCard.textContainer}>
                                <Text style={stylesCard.title}>{title}</Text>
                            </View>
                            <View style={stylesCard.imageContainer}>
                                {(module === "open" || aula === "open") ? (

                                    <Image source={require('../../../../assets/cadeado_open.png')} />
                                ) : (module === "success" || aula === "success") ? (
                                    <Image source={require('../../../../assets/success.png')} />
                                ) : (
                                    <Image source={require('../../../../assets/cadeado_fechado.png')} />
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

const stylesCard = {
    container: {
        // Your existing styles for container
    },
    cardContainer: {
        backgroundColor: "#94A3B8",
        borderRadius: 8,
    },
    innerContainer: {
        backgroundColor: "#CBD5E1",
        flexDirection: "row",
        flex: 1,
        marginTop: 3,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 50,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
    },
    imageContainer: {
        justifyContent: "flex-end",
        marginRight: 27,
    },
    containerCircle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'green',
        borderColor: 'blue',
        borderWidth: 2.5,
    },
};

export default CardCourse;
