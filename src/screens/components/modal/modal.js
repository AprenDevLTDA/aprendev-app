import React, { useState } from 'react';
import { View, Modal, Text, Image, Pressable, TextInput, StyleSheet } from 'react-native';

const ModalLobito = ({ backgroundColorClose = '#2196F3',
    backgroundColor = '#2196F3', width = 160,
    height = 179, onPress, onClose, imagem, btnName, titulo, visible = true, showInput = false, visibleCloseBottom = false }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClose && onClose();
            }}>
            <Pressable style={styles.centeredView} onPress={onClose}>
                <View style={styles.modalView}>
                    {visibleCloseBottom ?
                        (<View style={styles.closeButtonContainer}>
                            <Pressable style={[styles.closeButton, { backgroundColor: backgroundColorClose }]} onPress={onClose}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </Pressable>
                        </View>) : (<></>)}
                    <Text style={styles.modalText}>{titulo}</Text>
                    <View style={styles.containerimg}>
                        <Image
                            source={{ uri: imagem }}
                            style={{ width: width, height: height }}
                        />
                    </View>
                    {showInput && (
                        <TextInput
                            style={styles.input}
                            placeholder="Digite novo username"
                            value={inputValue}
                            onChangeText={setInputValue}
                        />
                    )}
                    <Pressable
                        style={[styles.button, { backgroundColor: backgroundColor }]}
                        onPress={() => {
                            onPress && onPress(inputValue);
                        }}>
                        <Text style={styles.textStyle}>{btnName}</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        width: 250
    },


    textStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: "500"
    },
    containerimg: {
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 8,
        width: 200,
        borderRadius: 8
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ModalLobito;
