import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image, View } from 'react-native';
import { Card } from 'react-native-paper';

export default function CardComponent({ name, imageNull = true, sourceImage, sourceImage2, price }) {

    return (

        <Card style={styles.outerCard}>
            <View style={[styles.innerCardContent, styles.innerCardPequeno]}>
                <Text>{name}</Text>
                <Image style={styles.mascote} source={{ uri: sourceImage }} />
                <View style={styles.textContainer}>
                    <View style={styles.subtitulo}>
                        {imageNull ? <Image style={{ width: 20, height: 20 }} source={{ uri: sourceImage2 }} /> : false}
                        <Text>{price}</Text>
                    </View>
                </View>
            </View>
        </Card>

    );
}

const styles = StyleSheet.create({
    mascote: {
        width: 100,
        height: 100,
        marginVertical: 8

    },
    subtitulo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    outerCard: {
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: '2%',
        borderColor: '#94A3B8',
        margin: 10,
        backgroundColor: '#94A3B8',
        alignItems: 'center',
        width: 150
    },
    innerCardContent: {
        borderRadius: 5,
        paddingVertical: 5,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#CBD5E1',
        alignItems: 'center',
        width: 130

    },

    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
