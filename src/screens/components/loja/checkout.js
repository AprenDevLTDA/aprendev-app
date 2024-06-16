import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { handleIntegrationMP } from '../../../utils/MPIntegration';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { User } from './object/User';
import RouterApi from '../../../utils/router_api';
import Client from '../../store/cliente';
import CourseProgramming from '../../store/course_programming';
import GIFPlayer from 'react-native-gif';
import { View } from 'react-native';

export default function Checkout() {
    const route = useRoute();
    const { info } = route.params;
    const [url, setUrl] = useState(null);
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(User.quantity);

    useEffect(() => {
        const handleBuy = async () => {
            const data = await handleIntegrationMP(info);
            if (data) {
                setUrl(data);
            } else {
                console.log("ERROR");
            }
        };
        handleBuy();
    }, [info]);

    async function stateChange(state) {
        let url = state.url;
        console.log(url.includes("approved"));
        if (state.canGoBack == true && !url.includes('mercadopago')) {

            if (url.includes("approved")) {

                Client.setCoins(Client.coins + info.points);
                const body = {
                    coins: Client.coins
                }
                await RouterApi.patch(`aprendev/clients/${Client.uid}`, body)
                CourseProgramming.setModalVisible(true);

                navigation.navigate('LojaMercadoPagoScreen')

            } else {
                CourseProgramming.setModalVisibleError(true);
                navigation.navigate('LojaMercadoPagoScreen')
            }
        }
    }

    return (
        url ? (
            <WebView
                originWhitelist={['*']}
                source={{ uri: url.sandbox_init_point }}
                style={{ marginTop: 20 }}
                startInLoadingState={true}
                onNavigationStateChange={state => stateChange(state)}
            />
        ) : (

            <View style={{
                position: 'absolute',
                height: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#0F172A"
            }}>
                <GIFPlayer
                    style={{
                        width: 150,
                        height: 150,
                    }}
                    source={require('../../../../assets/cabeca_1.gif')}
                    resizeMode='cover'
                />
            </View>

        )
    );
}
