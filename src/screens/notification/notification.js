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
import Navbar from '../components/navBar/navBar';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { observer } from 'mobx-react-lite';

import { useNavigation } from '@react-navigation/native';

export default Notification = observer(() => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{
            height: "100%",
            backgroundColor: "#E2E8F0"
        }}>
            <Navbar />
            <ScrollView contentContainerStyle={{ marginHorizontal: 12, marginVertical: 20 }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => {

                        navigation.goBack()

                    }}>
                        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                            <Icon name="arrow-back" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20 }}>Tela em construção</Text>
                    </View>
                </View>
                <View style={{ marginTop: "8%", marginBottom: "5%", alignSelf: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 30, marginBottom: 10 }}>Tela em construção!</Text>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>Volte quando tiverermos novas atualizações!!! LobITo Agradece</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Image style={{ width: "98%", height: 450 }} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/apren-dev-fdb98.appspot.com/o/config-app.png?alt=media&token=0f8ccd9d-de75-43fc-aac6-aed6d728fcd7" }} />
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
