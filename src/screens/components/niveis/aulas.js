import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../onboard/styles/style';
import CardCourse from '../card-course/card-course';
import { observer } from 'mobx-react-lite';
import Client from '../../store/cliente';
import CourseProgramming from '../../store/course_programming';

const Aulas = observer(() => {
    const route = useRoute();
    const { data_nivel, name_curso, key_course, nivel } = route.params;
    const [moduleStates, setModuleStates] = useState({});

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            Client.setScore(0);
            CourseProgramming.setDataNivel(data_nivel);
            const updatedModuleStates = {};
            const matricula = CourseProgramming.matriculas.find(m => m.uid_course === key_course);

            if (Client.progress === "" || CourseProgramming.nivel === 0) {
                Client.setProgress(matricula?.progress);
                CourseProgramming.setNivel(matricula?.level);

            }

            Object.keys(CourseProgramming.dataNivel)
                .filter(key => key !== "subject")
                .forEach(key => {
                    if (matricula?.status === "concluido") {
                        updatedModuleStates[key] = "success";
                    }

                    if (CourseProgramming.nivel !== nivel) {
                        updatedModuleStates[key] = "success";
                    } else {

                        if (Client.progress === "emblem") {

                            updatedModuleStates[key] = key === "emblem" ? "open" : "success";

                        } else if (Client.progress === key) {
                            updatedModuleStates[key] = "open";
                        } else {
                            const currentLessonNumber = parseInt(Client.progress.split('_')[1], 10);

                            const lessonNumber = parseInt(key.split('_')[1], 10);
                            updatedModuleStates[key] = lessonNumber < currentLessonNumber ? "success" : "close";

                        }
                    }
                });
            setModuleStates(updatedModuleStates);
        }, [data_nivel, key_course, nivel])
    );

    useEffect(() => {
    }, [Client.progress]);

    const handleCardPress = () => {
        // Handle card press logic
    };

    return (
        <SafeAreaView style={{
            backgroundColor: "#E2E8F0",
            height: "100%",
        }}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                borderBottomColor: "#000",
                borderBottomWidth: 2,
                paddingBottom: 8,
                paddingVertical: 10,
                backgroundColor: "white",

            }}>
                <TouchableOpacity onPress={() => {
                    CourseProgramming.setNivel(0);
                    Client.setProgress("");
                    Client.setScore(0);
                    navigation.goBack()

                }}>
                    <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                        <Icon name="arrow-back" size={30} color="#000" />
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 20 }}>{name_curso}</Text>
                </View>
            </View>
            <ScrollView>
                <View>
                    {/* Your other view code */}
                </View>
                {Object.keys(data_nivel)
                    .filter(key => key !== "subject")
                    .map(key => (
                        <TouchableOpacity key={key} onPress={() => handleCardPress()}>
                            <CardCourse
                                height={70}
                                width={333}
                                aula={moduleStates[key]}
                                redirect={moduleStates[key] === "success" ? "NivelOneView" : "NivelOne"}
                                data_nivel={{ key: key_course, data: data_nivel, name_curso: name_curso, key_nivel: key }}
                                title={key.includes('assessmentQuestion_') ? 'Desafio ' + key.slice(-2) : (key === "emblem" ? "Selo" : "Aula " + key.slice(-2))}
                            />
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
});

export default Aulas;
