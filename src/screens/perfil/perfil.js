import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    ScrollView,
    TextInput,
} from 'react-native';
import PerfilButtonComponent from '../components/button/perfil_button.component';
import Navbar from '../components/navBar/navBar';
import Client from '../store/cliente';
import CardCourseProgress from '../components/card-course/card_course_progress';
import CourseProgramming from '../store/course_programming';
import { observer } from 'mobx-react-lite';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalLobito from '../components/modal/modal';
import RouterApi from '../../utils/router_api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';






const Medalha = require('../../../assets/Medalha.png');

const progress_course = require('../../../assets/progress_course.png');

const Gear = require('../../../assets/settings_gear.png');
const Person = require('../../../assets/personagens.png');
const SetaBaixo = require('../../../assets/arrow_down.png');
const SetaLado = require('../../../assets/side_arrow.png');
const Notification = require('../../../assets/icon_notif.png')

export default Pefil = observer(() => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const logOut = async () => {
        try {
            await AsyncStorage.removeItem("uid");
            CourseProgramming.logOff();
            Client.logOff();
            Client.setIsUserLoggedIn(false);

            navigation.navigate("IntroScreen");
        } catch (error) {
            console.log(error);
        }
    }

    const updatePhoto = async (photo) => {
        try {
            await RouterApi.patch(`/aprendev/clients/${Client.uid}`, { char: photo })
            Client.setChar(photo);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeName = async (newName) => {
        const body = {
            nome: newName
        }
        await RouterApi.patch(`/aprendev/clients/${Client.uid}`, body)
        Client.setName(newName)
        setModalVisible(false);
    };

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
                        <Text style={{ fontSize: 20 }}>Meu Pefil</Text>
                    </View>
                </View>




                <View style={{
                    alignItems: 'center',
                    paddingVertical: 25,
                    gap: 10,
                }}>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Image style={{ width: 150, height: 150 }} source={{ uri: Client.char }} />
                    </View>
                    <View style={styles.name}>
                        <View style={{ width: "80%" }}>
                            <Text style={{ fontSize: 20 }}>{Client.name}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Image style={styles.pencilIcon} source={require('../../../assets/pencil.png')} />
                        </TouchableOpacity>
                        <ModalLobito
                            onClose={() => setModalVisible(false)}
                            visibleCloseBottom={true}
                            width={150}
                            height={150}
                            titulo="Alterar seu UserName"
                            btnName="Trocar"
                            imagem={`${Client.char}`}
                            visible={modalVisible}
                            showInput={true}
                            onPress={handleChangeName}


                        />
                    </View>

                    <PerfilButtonComponent
                        texto={'Progresso nos cursos'}
                        sourceImage={progress_course}
                        sourceImage2={SetaLado}
                    >

                        {CourseProgramming.cursos.map((element, index) => {
                            const key = CourseProgramming.keysCourse[index]?.key || "";
                            const matricula = CourseProgramming.matriculas.find(m => m.uid_course === key);

                            if (matricula?.status === "em andamento") {
                                // Calcula o total de aulas
                                let totalAulas = 0;
                                let totalNiveis = 0;
                                let aulasConcluidas = 0;
                                let niveisConcluidos = 0;
                                let totalDesafios = 0;
                                let desafiosConcluidos = 0;

                                for (const nivelKey in element) {
                                    if (element.hasOwnProperty(nivelKey) && nivelKey.startsWith('level_')) {
                                        totalNiveis++;
                                        const nivel = element[nivelKey];
                                        const nivelNum = parseInt(nivelKey.replace('level_', ''), 10);

                                        if (nivelNum < matricula?.level) {
                                            niveisConcluidos++;
                                        }

                                        for (const aulaKey in nivel) {
                                            if (nivel.hasOwnProperty(aulaKey) && aulaKey.startsWith('class_')) {
                                                totalAulas++;
                                                if (nivelNum < matricula?.level || (nivelNum === matricula?.level && parseInt(aulaKey.replace('class_', ''), 10) < matricula?.progress)) {
                                                    aulasConcluidas++;
                                                }
                                            }

                                            if (nivel.hasOwnProperty(aulaKey) && aulaKey.startsWith('assessmentQuestion_')) {
                                                totalDesafios++;
                                                if (nivelNum < matricula?.level || (nivelNum === matricula?.level && parseInt(aulaKey.replace('assessmentQuestion_', ''), 10) < matricula?.progress)) {
                                                    desafiosConcluidos++;
                                                }
                                            }
                                        }
                                    }
                                }

                                return (
                                    <View key={key}>
                                        <CardCourseProgress
                                            title={`${element.course}`}
                                            image={`${element.logo}`}
                                            progress={`${matricula?.level === 5 ? "concluido" : matricula?.status}`}
                                            aulas={`${totalAulas}`}
                                            niveis={`${totalNiveis}`}
                                            aulas_feitas={`${aulasConcluidas}`}
                                            niveis_feitos={`${niveisConcluidos}`}

                                        />
                                    </View>
                                );
                            } else {
                                return null;
                            }
                        })}


                    </PerfilButtonComponent>
                    <PerfilButtonComponent
                        texto={'Conquistas'}
                        sourceImage={Medalha}
                        sourceImage2={SetaBaixo}
                    >
                        <View style={{ flexDirection: 'row', flexWrap: "wrap", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>

                            {Client.selos?.length > 0 ? Client.selos.map((element, index) => {

                                return (

                                    <Image
                                        key={index}
                                        style={{ width: 70, height: 70, marginBottom: 8, marginRight: index !== Client.selos.length - 1 ? 5 : 0 }}
                                        source={{ uri: element }}
                                    />

                                );


                            }) :
                                (<>
                                    <Text style={{ textAlign: "center", fontSize: 16 }}>Você ainda não tem nenhuma conquista</Text>
                                </>)
                            }
                        </View>








                    </PerfilButtonComponent>
                    <PerfilButtonComponent
                        redirect={"Notification"}
                        showIcon={false}
                        expandable={false}
                        texto={'Notificações'}
                        sourceImage={Notification}
                        sourceImage2={SetaLado}
                    ></PerfilButtonComponent>
                    <PerfilButtonComponent
                        texto={'Meus Personagens'}
                        sourceImage={Person}
                        sourceImage2={SetaLado}
                    >
                        <View style={{ flexDirection: 'row', flexWrap: "wrap", alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                            {Client.characters.map((element, index) => {
                                const isEquipped = element === Client.char;

                                return (
                                    <View key={index} style={{ borderRadius: 8, margin: 10, }}>
                                        <Image
                                            key={index}
                                            style={{ width: 100, height: 100, padding: 10, marginBottom: 10, marginRight: index !== Client.characters.length - 1 ? 5 : 0 }}
                                            source={{ uri: element }}
                                        />
                                        <TouchableOpacity onPress={() => updatePhoto(element)} disabled={isEquipped ? true : false} style={{ backgroundColor: `${isEquipped ? "#A3A3A3" : "#3B82F6"}`, borderRadius: 8 }}>
                                            <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>{isEquipped ? "Equipado" : "Equipar"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );

                            })}
                        </View>
                    </PerfilButtonComponent>
                    <PerfilButtonComponent
                        texto={'Configurações'}
                        redirect={"Configuração"}
                        showIcon={false}
                        expandable={false}
                        sourceImage={Gear}
                        sourceImage2={SetaLado}
                    />
                    <TouchableOpacity style={styles.logout} onPress={() => logOut()}>
                        <View >

                            <Text style={{ fontSize: 16 }}>SAIR DA CONTA</Text>

                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView >
        </SafeAreaView >
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
        marginBottom: 10,
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
