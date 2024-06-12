import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Tracking() {

    return (
        <View style={styles.container}>
            <Text>Seu pagamento foi aprovado.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        paddingHorizontal: '10%',
    }
});
