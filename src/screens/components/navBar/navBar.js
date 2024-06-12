import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RouterApi from '../../../utils/router_api';
import Cliente from '../../store/cliente';
import { useEffect, useState } from 'react';
import { auth } from '../../../utils/firebase_config';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import ModalLobito from '../modal/modal';

const Logo = require('../../../../assets/logo.png');
const Monetization = require('../../../../assets/monetization.png');
const Heart = require('../../../../assets/ion_heart-sharp.png');
const Notification = require('../../../../assets/mdi_bell-outline.png');
const Shop = require('../../../../assets/shop.png')
const Navbar = observer(() => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <ModalLobito btnName={"Mario"}
                onClose={() => {
                    setModalVisible(false)
                }}
                onPress={
                    () => {
                        setModalVisible(false)
                        navigation.navigate('Loja')
                    }
                }
                visibleCloseBottom={true}
                titulo={`Olá, caro AprenDev! Se quiser comprar mais Vidas, visite nossa Loja! Lá está repleto de Corações, aproveite!!! ❤️`} visible={modalVisible} />
            <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center", marginTop: 18 }}><Image style={{ width: 80, height: 40, marginLeft: 25 }} source={Logo} /></View>
            <View style={styles.leftSide}>
                <TouchableOpacity onPress={() => { navigation.navigate('Loja') }}>
                    <View style={styles.iconWithText}>
                        <Image source={Monetization} />
                        <Text style={styles.iconText}>{Cliente.coins}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => setModalVisible(true)}>
                    <View style={styles.heartContainer}>
                        <Image source={Heart} />
                        <Text style={styles.notificationText}>{Cliente.heart}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("ola moises")}>
                    <Image source={Notification} style={{ marginRight: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Loja') }}>
                    <Image source={Shop} style={{ marginRight: 25, width: 25, height: 25 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        color: "red",
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
        marginTop: 18
    },
    iconText: {
        color: "black",
        fontSize: 12,

    },
    heartContainer: {
        position: 'relative',
    },
    notificationText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -3 }, { translateY: -8.5 }], // Ajuste para centralizar
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',

    },
});

export default Navbar;
