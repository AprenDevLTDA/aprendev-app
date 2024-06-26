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
    const { google = false, googlePress, borderWidth = 1, borderColor = "#000", sourceImage, texto, children, showIcon = true, expandable = true, redirect = "", padding = 15, backgroundColor = '#CBD5E1' } = props;
    const [expanded, setExpanded] = useState(false);
    const navigation = useNavigation();

    const handlePress = () => {
        if (expandable) {
            setExpanded(!expanded);
        } else if (google) {
            googlePress();
        }
        else {
            navigation.navigate(redirect);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, { borderWidth: borderWidth, borderColor: borderColor, padding: padding, backgroundColor: backgroundColor }]} onPress={handlePress}>
                <View style={[styles.buttonContent, !showIcon && styles.buttonContentNoIcon]}>
                    <Image source={sourceImage} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.buttonTitle}>{texto}</Text>
                    </View>
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
    container: {
        alignItems: 'center',
    },
    button: {
        borderRadius: 8,
        width: '90%',
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
        flex: 1,
    },
    buttonContentNoIcon: {
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: 8,
    },
    buttonTitle: {
        fontSize: 20,
        flexShrink: 1,
        flexGrow: 1,
    },
    content: {
        padding: 15,
        backgroundColor: '#E2E8F0',
        borderRadius: 10,
        borderWidth: 1,
        width: '90%',
    },
});
