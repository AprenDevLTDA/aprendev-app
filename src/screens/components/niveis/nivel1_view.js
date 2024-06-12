import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Client from '../../store/cliente';
import { observer } from 'mobx-react-lite';

const Heart = require('../../../../assets/ion_heart-sharp.png');
const HeartWhite = require('../../../../assets/coracao_branco.png');

const NivelOneView = observer(() => {
    const route = useRoute();
    const { data, name_curso, key, key_nivel } = route.params;
    const [dataKeysCurrent, setDataKeysCurrent] = useState(Object.keys(data)[1]);

    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
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
                                {data[key_nivel].descricao !== undefined ? <>
                                    <Text style={{ justifyContent: "center", textAlign: "center", marginBottom: 16, fontSize: 20 }}>{data[key_nivel].titulo}</Text>
                                    <Text style={{ justifyContent: "space-around", textAlign: "justify", marginBottom: 16 }}>{data[key_nivel].descricao}</Text>
                                </> : data[key_nivel].pergunta !== undefined ? <>
                                    <Text style={{ justifyContent: "center", textAlign: "center", marginBottom: 16, fontSize: 20 }}>{data[key_nivel].pergunta}</Text>
                                </> : <></>}
                                {data[key_nivel].arrayImagens === undefined ? <></> : <View style={{ width: "100%", borderRadius: 8 }}>
                                    <Image
                                        source={{ uri: data[key_nivel].arrayImagens[0] }}
                                        style={{ width: "100%", height: 150, borderRadius: 8 }}
                                    />
                                </View>}
                                {data[key_nivel].topico === undefined ? <></> : <Text style={{ justifyContent: "space-around", textAlign: "justify", marginBottom: 16, marginTop: 16 }}>{data[key_nivel].topico}</Text>}
                                {data[key_nivel].arrayImagens === undefined ? <></> : <View style={styles.containerimg}>
                                    <Image
                                        source={{ uri: data[key_nivel].arrayImagens[1] }}
                                        style={{ width: "100%", height: 150, borderRadius: 8 }}
                                    />
                                </View>}
                            </ScrollView>
                        </View>
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

export default NivelOneView;
