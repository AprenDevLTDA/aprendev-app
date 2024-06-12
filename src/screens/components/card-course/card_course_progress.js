import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../onboard/styles/style';

const CardCourseProgress = ({ aulas_feitas, niveis_feitos, niveis, aulas, title, image, progress, width = "100%", height = 200 }) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={[stylesCard.cardContainer, { width, height }]}>
                    <View style={[stylesCard.innerContainer, {}]}>
                        <View>
                            <Image source={{ uri: image }} style={stylesCard.courseImage} />
                        </View>
                        <View style={{ marginVertical: "2%" }}>
                            <Text style={stylesCard.title}>{title}</Text>
                        </View>
                        <View style={{ alignContent: "center", justifyContent: "center" }}>

                            <Text style={stylesCard.progress}>{progress}</Text>
                            <View style={{ marginVertical: "2%" }}>
                                <Text style={stylesCard.progress}>Aulas Feitas: {aulas_feitas} / {aulas}</Text>
                                <Text style={stylesCard.progress}>Niveis Feitos: {niveis_feitos} / {niveis}</Text>
                            </View>
                        </View>








                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const stylesCard = {
    container: {
        // Your existing styles for container
    },
    cardContainer: {
        backgroundColor: "#94A3B8",
        borderRadius: 8,
    },
    innerContainer: {
        backgroundColor: "#CBD5E1",

        flex: 1,
        marginTop: 3,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    courseImage: {
        width: 40,
        height: 40,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 16,
    },
    progress: {
        textAlign: "center",
        fontSize: 16,
        color: "#6B7280",



    },
    stagesContainer: {
        marginTop: 10,
    },
    stageText: {
        fontSize: 16,
        color: "#4B5563",
    },
};

export default CardCourseProgress;
