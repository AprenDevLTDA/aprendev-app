import React from 'react';
import {
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import PerfilButtonComponent from '../components/button/perfil_button.component';
import Navbar from '../components/navBar/navBar';
import Client from '../store/cliente';
import CardCourse from '../components/card-course/card-course';
import CardCourseProgress from '../components/card-course/card_course_progress';
import CourseProgramming from '../store/course_programming';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';






const Medalha = require('../../../assets/Medalha.png');
const acessibility = require('../../../assets/mode-theme.png')

const SetaBaixo = require('../../../assets/arrow_down.png');

export default ConfigScreen = observer(() => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
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
                        <Text style={{ fontSize: 20 }}>Configurações</Text>
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                    paddingVertical: 25,
                    gap: 10,
                }}>
                    <PerfilButtonComponent
                        texto={'Acessibilidade'}
                        sourceImage={acessibility}
                        sourceImage2={SetaBaixo}
                    >
                    </PerfilButtonComponent>
                    <PerfilButtonComponent
                        texto={'Notificação'}
                        sourceImage={Medalha}
                        sourceImage2={SetaBaixo}
                    >
                    </PerfilButtonComponent>
                    <PerfilButtonComponent
                        texto={'Perguntas frequentes'}
                        sourceImage={Medalha}
                        sourceImage2={SetaBaixo}
                    >
                    </PerfilButtonComponent>
                    <PerfilButtonComponent
                        texto={'Fale conosco'}
                        sourceImage={Medalha}
                        sourceImage2={SetaBaixo}
                    >
                    </PerfilButtonComponent>
                    <TouchableOpacity style={{ marginTop: "45%" }}>
                        <Text style={{ color: "red", fontSize: 12 }}>
                            Excluir conta
                        </Text>
                    </TouchableOpacity>
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
