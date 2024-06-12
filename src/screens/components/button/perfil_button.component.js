import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PerfilButtonComponent(props) {
    const { sourceImage, texto, children, showIcon = true, expandable = true, redirect = "" } = props;
    const [expanded, setExpanded] = useState(false);
    const navigation = useNavigation();

    const handlePress = () => {
        if (expandable) {
            setExpanded(!expanded);
        } else {
            navigation.navigate(redirect);
        }
    };

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <View style={[styles.buttonContent, !showIcon && styles.buttonContentNoIcon]}>
                    <Image source={sourceImage} style={styles.image} />
                    <Text style={styles.buttonTitle}>{texto}</Text>
                </View>
                {showIcon && (
                    <MaterialIcons name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={30} />
                )}
            </TouchableOpacity>
            {expanded && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        width: '90%',
        backgroundColor: '#CBD5E1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 30,
        height: 30,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContentNoIcon: {
        width: '100%',
    },
    buttonTitle: {
        fontSize: 20,
        marginLeft: 8,
    },
    content: {
        padding: 15,
        backgroundColor: '#E2E8F0',
        borderRadius: 10,
        borderWidth: 1,
        width: '90%',
    },
});
