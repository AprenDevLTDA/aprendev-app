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

import { useNavigation } from '@react-navigation/native';
import { VidaExtra } from './object/VidaExtra';
import { Cachorro } from './object/BonecoVermelho';
import CardComponent from './card';
import Navbar from '../navBar/navBar';
import ModalLobito from '../modal/modal';
import CourseProgramming from '../../store/course_programming';
import Icon from 'react-native-vector-icons/MaterialIcons';
const BonecoVermelho = require('../../../../assets/boneco_vermelho.png');
const BonecoAzul = require('../../../../assets/boneco_azul.png');
const BonecoVerde = require('../../../../assets/boneco_verde.png');
const BonecoAmarelo = require('../../../../assets/boneco_amarelo.png');
const Monetization = require('../../../../assets/monetization.png');

export default LojaScreen = observer(() => {

    const handleChangeName = () => {
        CourseProgramming.setModalVisible(false);
    }
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
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


                <ModalLobito
                    titulo={`Show você acabou de adquitir 999 Coins`}
                    btnName="Beleza LobITo"
                    imagem="https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/IMG-20240523-WA0032.jpg?alt=media&token=e9fbb469-677d-4beb-8fd2-4bf43e58ae0e"
                    visible={CourseProgramming.modalVisible}
                    onPress={handleChangeName}


                />
                <Card
                    style={styles.outerCard}
                    onPress={() => navigation.navigate('Checkout', { info: VidaExtra })}
                >
                    <View style={[styles.innerCardContent, styles.innercardGrande]}>
                        <Image
                            style={styles.logo}
                            source={VidaExtra.imageSource}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.textoCardGrande}>{VidaExtra.title}</Text>
                            <View style={styles.subtitulo}>
                                <Image source={VidaExtra.monetizationImage} />
                                <Text>{VidaExtra.points}</Text>
                            </View>
                        </View>
                    </View>
                </Card>



                <View style={styles.cardContainer}>
                    <CardComponent
                        sourceImage={BonecoVermelho}
                        sourceImage2={Monetization}
                        price={'200'}
                        onPress={() => navigation.navigate('Checkout', { Cachorro })}
                    />
                    <CardComponent
                        sourceImage={BonecoAzul}
                        sourceImage2={Monetization}
                        price={'200'} a
                    />
                    <CardComponent
                        sourceImage={BonecoAmarelo}
                        sourceImage2={Monetization}
                        price={'200'}
                    />
                    <CardComponent
                        sourceImage={BonecoVerde}
                        sourceImage2={Monetization}
                        price={'200'}
                    />
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
        width: 100,
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
