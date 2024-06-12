import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#E2E8F0"
    },
    container: {
        flexDirection: 'row', // Isso alinha os botões horizontalmente
        justifyContent: 'center', // Isso centraliza os botões horizontalmente no container
        marginTop: 20, // Ajuste a margem superior conforme necessário
    },
    image: {
        width: 120,
        height: 60
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: "center"
    },
    label_aster:
    {
        color: "red",

    },
    label: {
        color: "black"
    },
    description: {
        fontSize: 16,
        marginTop: 25,
        textAlign: 'center',
        flexWrap: 'wrap'

    },
    formContainer: {
        margin: 20,
        marginTop: "10%"
    },
    buttonIntro: {
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 12,
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row', // Isso alinha os botões horizontalmente
        justifyContent: 'center', // Isso centraliza os botões horizontalmente no container
        marginTop: 20, // Ajuste a margem superior conforme necessário

    },
    button: {
        backgroundColor: '#3B82F6', // Cor de fundo do botão
        padding: 10, // Ajuste o preenchimento conforme necessário
        marginHorizontal: 10, // Espaçamento horizontal entre os botões
        borderRadius: 5, // Borda arredondada
        width: 120,
        height: 45
    },
    button2: {
        backgroundColor: '#0F172A', // Cor de fundo do botão
        padding: 10, // Ajuste o preenchimento conforme necessário
        marginHorizontal: 10, // Espaçamento horizontal entre os botões
        borderRadius: 5, // Borda arredondada
        width: 120,
        height: 45
    },
    buttonText: {
        color: 'white', // Cor do texto
        textAlign: 'center', // Alinha o texto ao centro dentro do botão
        fontSize: 16, // Ajuste o tamanho da fonte conforme necessário
    },
    containerLine: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 1,
        width: '50%', // Alterado para ocupar toda a largura
        backgroundColor: '#3B82F6',
        color: '#3B82F6',
        marginTop: 30,

    },


    containerCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60
    },
    checkbox: {
        alignSelf: 'center',
        marginLeft: 10, // Personaliza el margen según tus necesidades
    },
    label: {
        marginLeft: 5,
        fontSize: 16, // Personaliza el tamaño de fuente según tus necesidades
    },
});
export default styles;