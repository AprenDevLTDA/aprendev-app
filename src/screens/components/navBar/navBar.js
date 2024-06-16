import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RouterApi from '../../../utils/router_api';
import Cliente from '../../store/cliente';
import { useEffect, useState } from 'react';
import { auth } from '../../../utils/firebase_config';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import ModalLobito from '../modal/modal';

const Logo = require('../../../../assets/logo.png');
const Monetization = require('../../../../assets/coin_plus.png');
const Heart = require('../../../../assets/ion_heart-sharp.png');
const Notification = "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/icon_notif.png?alt=media&token=f09a37e8-a72d-462a-999a-286744463b8a";
const Shop = require('../../../../assets/shop.png')
const Navbar = observer(() => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({});

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
    function Cronometro() {
        const [tempo, setTempo] = useState(1800); // Inicializa com 90 segundos (1 minuto e 30 segundos)

        useEffect(() => {
            const timer = setInterval(() => {
                setTempo(tempo => tempo - 1);
            }, 1000); // Decrementa a cada segundo (1000 ms)

            return () => clearInterval(timer);
        }, []);

        useEffect(() => {
            if (tempo <= 0) {
                let heart = Cliente.heart + 1;
                RouterApi.patch(`/aprendev/clients/${Cliente.uid}`, { heart: heart })
                Cliente.setHeart(Cliente.heart + 1); // Garante que a vida não ultrapasse 5
                setTempo(1800); // Reinicia o tempo para 1 minuto e 30 segundos
            }
        }, [tempo]);

        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        };

        return (
            <View>
                <Text style={{ fontSize: 10, color: "#3B82F6", fontWeight: "800" }}>{formatTime(tempo)}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ModalLobito
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
            <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center", marginTop: 18 }}><Image style={{ width: 80, height: 40, marginLeft: 25 }} source={Logo} /></View>
            </TouchableOpacity>
            <View style={styles.leftSide}>
                <TouchableOpacity onPress={() => showModal("https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/LobitoCoin.png?alt=media&token=3c116342-67fa-41c2-ad56-fd0605dc759c", "Ir para Loja de Moedas", `Quer comprar mais Moedinhas? Visite nossa Lojinha de Moedas! Lá tem muitos pacotes para você! 💰`, () => {
                    setModalVisible(false)
                    navigation.navigate('LojaMercadoPagoScreen')
                },)}>
                    <View style={styles.iconWithText}>
                        <Image style={{ width: 28, height: 30 }} source={Monetization} />
                        <View style={{ marginBottom: 3 }}></View>
                        <Text style={[styles.iconText, { fontSize: 10, fontWeight: "800", color: "#3B82F6", }]}>{Cliente.coins}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10, marginLeft: 8 }} onPress={() => showModal("https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/LobitoCoracao.png?alt=media&token=8f47f082-7975-4855-8118-fbc92746b438", "Ir para Loja", `Se quiser comprar mais Vidas, visite nossa Loja! Lá está repleto de Corações, aproveite!!! ❤️`, () => {
                    setModalVisible(false)
                    navigation.navigate('Loja')
                },)}>
                    <View style={styles.heartContainer}>
                        <Image source={Heart} />
                        <Text style={styles.notificationText}>{Cliente.heart}</Text>
                        <Text style={styles.iconText}>
                            {Cliente.heart < 5 && <Cronometro />}
                            {Cliente.heart >= 5 && <Text style={{ fontSize: 10, color: "#3B82F6", fontWeight: "800" }}>CHEIO!</Text>}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                    <Image source={{ uri: Notification }} style={{ marginLeft: 8, marginRight: 25, width: 30, height: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showModal("https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/LobitoLoja.png?alt=media&token=3ffc7e5c-9c45-4bae-bacc-eb4e66f0360a", "Ir para Loja", `Visite nossa Lojinha para encontrar itens incríveis!`, () => {
                    setModalVisible(false)
                    navigation.navigate('Loja')
                },)}>
                    <Image source={Shop} style={{ marginRight: 25, width: 25, height: 25 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        color: "red",
        backgroundColor: "white",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: "#0F172A",
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
    leftSide: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    iconWithText: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center",
        marginTop: 8,
        marginRight: 10

    },
    iconText: {
        color: "black",
        fontSize: 12,

    },
    heartContainer: {
        position: 'relative',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: 12
    },
    notificationText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -3 }, { translateY: -3.2 }], // Ajuste para centralizar
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',

    },
});

export default Navbar;
