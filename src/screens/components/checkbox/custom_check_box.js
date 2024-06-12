import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado este paquete si lo estás utilizando
import Client from '../../store/cliente';

const CustomCheckBox = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [nivel, setNivel] = useState("");

    const toggleCheckbox1 = () => {
        setIsChecked(true);
        setIsChecked2(false);
        setIsChecked3(false);
        Client.setNivel("iniciante");
    };

    const toggleCheckbox2 = () => {
        setIsChecked(false);
        setIsChecked2(true);
        setIsChecked3(false);
        Client.setNivel("intermediário");


    };

    const toggleCheckbox3 = () => {
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked3(true);
        Client.setNivel("avançado");

    };
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.container} onPress={toggleCheckbox1}>
                <Ionicons
                    name={isChecked ? 'square' : 'square-outline'}
                    color={'black'} // Personalize as cores conforme necessário
                    style={isChecked ? styles.checked : styles.unchecked}
                />
                <View>
                    <Text style={{
                        textAlign: "center", fontWeight: 'bold',
                    }}>iniciante</Text>
                    <Text style={{ textAlign: "center" }}>(Nunca praticou, não por onde começar)</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container} onPress={toggleCheckbox2}>
                <Ionicons
                    name={isChecked2 ? 'square' : 'square-outline'}
                    color={'black'} // Personalize as cores conforme necessário
                    style={isChecked2 ? styles.checked : styles.unchecked}
                />
                <View>
                    <Text style={{
                        textAlign: "center", fontWeight: 'bold',
                    }}>intermediário</Text>
                    <Text style={{ textAlign: "center" }}>(Já programou, sabe os conceitos básicos)</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container} onPress={toggleCheckbox3}>
                <Ionicons
                    name={isChecked3 ? 'square' : 'square-outline'}
                    color={'black'} // Personalize as cores conforme necessário
                    style={isChecked3 ? styles.checked : styles.unchecked}
                />
                <View>
                    <Text style={{
                        textAlign: "center", fontWeight: 'bold',
                    }}>avançado</Text>
                    <Text style={{ textAlign: "center" }}>(Trabalha na área ou sabe estruturas {"\n"}complexas)</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50
    },
    label: {
        marginLeft: "6%",
        fontSize: 15,
        textAlign: "center"

    },
    checked: {
        borderWidth: 1,
        marginLeft: 50,
        paddingTop: 2,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 8,
        fontSize: 30,
        marginRight: 8


    },
    unchecked: {
        borderWidth: 1,
        marginLeft: 50, paddingTop: 2,
        justifyContent: 'center',
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 8,
        fontSize: 30,
        marginRight: 8


    },
});

export default CustomCheckBox;
