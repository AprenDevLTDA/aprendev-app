import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Client from '../../store/cliente';
import { observer } from 'mobx-react-lite';
import RouterApi from '../../../utils/router_api';
import { db } from '../../../utils/firebase_config';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import ModalLobito from '../modal/modal'
import CourseProgramming from '../../store/course_programming';
const Heart = require('../../../../assets/ion_heart-sharp.png');
const HeartWhite = require('../../../../assets/coracao_branco.png');
const NivelOne = observer(() => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [incorrectSelections, setIncorrectSelections] = useState([]); // Track incorrect selections

    const route = useRoute();
    const { data, name_curso, key, key_nivel } = route.params;
    const [dataKeysCurrent, setDataKeysCurrent] = useState(key_nivel);
    const [selectedIndex, setSelectedIndex] = useState(null);

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

    const handleNoOptionSelected = () => {
        showModal(
            "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/warning.png?alt=media&token=c14850b0-9bfe-4730-9757-0b63edd4f532",
            "Beleza, LobITo!",
            "Você se esqueceu de selecionar uma alternativa...",
            () => setModalVisible(false)
        );
    };

    const handleCorrectAnswer = async () => {
        showModal(
            "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/IMG-20240523-WA0032.jpg?alt=media&token=e9fbb469-677d-4beb-8fd2-4bf43e58ae0e",
            "Beleza, LobITo!",
            "BOA! Você acertou!",
            async () => {
                await verify();
                setModalVisible(false);
            }
        );
    };

    const handleWrongAnswer = async () => {
        showModal(
            "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/mascotetriste.png?alt=media&token=ef78b123-8575-46b6-933e-9add64e1a56b",
            "Beleza, LobITo!",
            "Não foi dessa vez, resposta errada. Tente novamente!",
            async () => {
                await verifyErroQuestion();
                setModalVisible(false);
            }
        );
    };

    const handleOutOfLives = async () => {
        showModal(
            "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/mascotetriste.png?alt=media&token=2724ce5e-f038-4be7-8430-8d84064a4c50",
            "Comprar",
            "Ih, suas vidas acabaram... Compre mais vidas para tentar novamente!",
            async () => {
                await verifyErroQuestion();
                setModalVisible(false);
            }
        );
    };

    const handleBadge = async () => {
        showModal(
            data[dataKeysCurrent],
            "Resgatar Selo",
            "SHOW! Você finalizou o nivel. Resgate seu selo, e siga nos estudos!",
            async () => {
                await fetchBadgeCourse();
                setModalVisible(false);
            }
        );
    };

    const nextKey = async () => {
        try {
            if (data[dataKeysCurrent].arrayAlternativas === undefined) {
                if (Client.progress !== "selo") {
                    await verify();
                    return;
                } else {
                    await handleBadge();
                    return
                }
            }

            if (selectedIndex === null) {
                handleNoOptionSelected();
                return;
            }

            if (Client.heart === 0) {
                handleOutOfLives();
                return;
            }

            if (data[dataKeysCurrent].arrayAlternativas[selectedIndex] === data[dataKeysCurrent].resposta) {
                await handleCorrectAnswer();
            } else {
                await handleWrongAnswer();
            }

        } catch (error) {
            console.error(error);
        }
    };

    const fetchBadgeCourse = async () => {
        Client.setHashCoursesUser(key);

        const selo = data[dataKeysCurrent];
        const seloPath = `aprendev/clientes/${Client.uid}`;

        try {
            // Leia o valor atual do selo
            const currentDataSnapshot = await RouterApi.get(seloPath);

            // Verifica se existe algum dado no caminho
            const currentData = currentDataSnapshot ? currentDataSnapshot.val() : {};

            // Verifica se existe a propriedade 'selos' e garante que é um array
            const selos = currentData.selos ? currentData.selos : [];

            // Incrementa o valor do selo localmente
            const updatedData = {
                ...currentData,
                selos: [...selos, selo]
            };

            // Atualiza o valor no banco de dados
            await RouterApi.patch(seloPath, updatedData);

            // Atualiza o estado do cliente localmente
            Client.setSelos([...selos, selo]);

            // Incrementa o nível localmente
            CourseProgramming.setNivel(CourseProgramming.nivel + 1);
            const body = {
                nivel: CourseProgramming.nivel,
                progress: "aula_01"
            };

            const matriculasQuery = query(ref(db, '/aprendev/matriculas'), orderByChild('uid_course'), equalTo(Client.hashCoursesUser));
            const matriculasSnapshot = await get(matriculasQuery);

            if (matriculasSnapshot.exists()) {
                const matriculasData = matriculasSnapshot.val();
                const filteredData = Object.entries(matriculasData)
                    .filter(([key, matricula]) => matricula.uid === Client.uid)
                    .map(([key, matricula]) => ({ key, ...matricula }));

                const matriculasArray = filteredData.map(item => item.key);
                Client.setHashMatricula(matriculasArray);
            }
            await RouterApi.patch(`/aprendev/matriculas/${Client.hashMatricula}`, body);
            Client.setProgress("");
            CourseProgramming.setNivel(0);
            navigation.navigate("Cursos");

        } catch (error) {
            console.error("Error updating badge:", error);
        }
    };

    const verify = async () => {
        const keysProgressos = Object.keys(data);
        const keyProgress = keysProgressos.indexOf(dataKeysCurrent);
        Client.setProgress(keysProgressos[keyProgress + 1]);
        Client.setHashCoursesUser(key);
        const body = { progress: Client.progress };

        const matriculasQuery = query(ref(db, '/aprendev/matriculas'), orderByChild('uid_course'), equalTo(Client.hashCoursesUser));
        const matriculasSnapshot = await get(matriculasQuery);

        if (matriculasSnapshot.exists()) {
            const matriculasData = matriculasSnapshot.val();
            const filteredData = Object.entries(matriculasData)
                .filter(([key, matricula]) => matricula.uid === Client.uid)
                .map(([key, matricula]) => ({ key, ...matricula }));

            const matriculasArray = filteredData.map(item => item.key);
            Client.setHashMatricula(matriculasArray);
        }
        await RouterApi.patch(`/aprendev/matriculas/${Client.hashMatricula}`, body);

        const keys = Object.keys(data);
        const currentIndex = keys.indexOf(dataKeysCurrent);
        if (currentIndex < keys.length - 1) {
            setDataKeysCurrent(keys[currentIndex + 1]);
        }
        setIncorrectSelections([]);
        setSelectedIndex(null);
        const coins = Client.coins + 5;
        const bodyCoin = {
            coins: coins
        }
        Client.setCoins(coins);
        await RouterApi.patch(`/aprendev/clientes/${Client.uid}`, bodyCoin);
    };

    const verifyErroQuestion = async () => {

        if (Client.heart === 0) {
            navigation.navigate('Home');
        } else {
            setIncorrectSelections([...incorrectSelections, selectedIndex]);
            setSelectedIndex(null);
            const heart = Client.heart - 1;
            const body = {
                heart: heart
            }
            Client.setHeart(heart);
            await RouterApi.patch(`/aprendev/clientes/${Client.uid}`, body);
        }
    };

    const navigation = useNavigation();

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
            {console.log(dataKeysCurrent)}
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {

                    navigation.goBack()
                }}>
                    <View style={{ paddingRight: 20, paddingLeft: 20 }}>

                        <Icon name="arrow-back" size={30} color="#000" />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 20 }}>{name_curso}</Text>
                </View>
            </View>
            <View style={{ backgroundColor: "#e2e8f0", height: "100%" }}>
                <View style={{ flexDirection: "column", marginLeft: 20, marginRight: 20, }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
                        {(() => {
                            const items = [];
                            const heart = [];
                            let i;
                            for (i = 1; i <= Client.heart; i++) {
                                heart.push(i);
                            }
                            for (let index = 1; index <= 5; index++) {
                                if (heart.includes(index)) {
                                    items.push(
                                        <Image key={index} source={Heart} />
                                    );
                                } else {
                                    items.push(
                                        <Image key={index} source={HeartWhite} />
                                    );
                                }
                            }
                            return items;
                        })()}
                    </View>
                    <View style={{ height: "80%", borderColor: "000", borderWidth: 2, marginTop: 8, padding: 16, marginBottom: "30%", borderRadius: 8 }}>
                        <View style={{ height: "90%", backgroundColor: "#CBD5E1", width: "100%", paddingTop: 20, padding: 16, borderRadius: 8 }}>
                            <ScrollView>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginBottom: 20
                                }}>
                                    <View style={{ borderColor: "transparent", borderWidth: 1, backgroundColor: "#073b91", borderRadius: 8 }}>
                                        <View style={{ backgroundColor: "#CBD5E1", flexDirection: "row", flex: 1, width: 205, height: 35, margin: 1, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ textAlign: "center", marginRight: 8 }}>{data.assunto}</Text>
                                        </View>
                                    </View>
                                </View>
                                {dataKeysCurrent === "selo" && <View style={{ alignItems: 'center', textAlign: "center" }}><Image style={{ width: 204, height: 200 }} source={{ uri: data[dataKeysCurrent] }} /></View>}
                                {data[dataKeysCurrent].descricao !== undefined ? <>
                                    <Text style={{ justifyContent: "center", textAlign: "center", marginBottom: 16, fontSize: 20 }}>{data[dataKeysCurrent].titulo}</Text>
                                    <Text style={{ justifyContent: "space-around", textAlign: "justify", marginBottom: 16 }}>{data[dataKeysCurrent].descricao}</Text>
                                </> : data[dataKeysCurrent].pergunta !== undefined ? <>
                                    <Text style={{ justifyContent: "center", textAlign: "center", marginBottom: 16, fontSize: 20 }}>{data[dataKeysCurrent].pergunta}</Text>
                                </> : <></>}
                                {data[dataKeysCurrent].arrayImagens === undefined ? <></> : <View style={{ width: "100%", borderRadius: 8 }}>
                                    <Image
                                        source={{ uri: data[dataKeysCurrent].arrayImagens[0] }}
                                        style={{ width: "100%", height: 150, borderRadius: 8 }}
                                    />
                                </View>}
                                {data[dataKeysCurrent].topico === undefined ? <></> : <Text style={{ justifyContent: "space-around", textAlign: "justify", marginBottom: 16, marginTop: 16 }}>{data[dataKeysCurrent].topico}</Text>}
                                {data[dataKeysCurrent].arrayImagens === undefined ? <></> : <View style={styles.containerimg}>
                                    <Image
                                        source={{ uri: data[dataKeysCurrent].arrayImagens[1] }}
                                        style={{ width: "100%", height: 150, borderRadius: 8 }}
                                    />
                                </View>}
                                {data[dataKeysCurrent].arrayAlternativas === undefined ? <></> :
                                    data[dataKeysCurrent].arrayAlternativas.map((alternativa, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setSelectedIndex(index)}
                                            disabled={incorrectSelections.includes(index)} // Disable if previously selected incorrectly
                                        >
                                            <View
                                                style={{
                                                    borderRadius: 8,
                                                    marginBottom: 16,
                                                    backgroundColor: selectedIndex === index ? "blue" : incorrectSelections.includes(index) ? "gray" : "red", // Gray out incorrect answers
                                                    width: "100%",
                                                    padding: 20
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        textAlign: 'center',
                                                        color: selectedIndex === index || incorrectSelections.includes(index) ? "white" : "black"
                                                    }}
                                                >
                                                    {alternativa}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>))
                                }
                            </ScrollView>
                        </View>
                        <TouchableOpacity onPress={() => { nextKey() }} style={{ backgroundColor: "#042357", marginTop: 10, borderRadius: 8, padding: 20 }}>
                            <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>{data[dataKeysCurrent].arrayAlternativas === undefined ? "Proximo" : "Responder"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </>
    )
});
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        paddingBottom: 8
    },
    containerList: {
        justifyContent: 'center',
        marginBottom: 16
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: "50%",
        bottom: 0,
        width: 100
    },
    item: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    containerimg: {
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 78.2,
        height: 86.3,
    },
})
export default NivelOne
