import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
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
            CourseProgramming.setDataNivel(data_nivel);
            const updatedModuleStates = {};
            const matricula = CourseProgramming.matriculas.find(m => m.uid_course === key_course);
            if (Client.progress === "" || CourseProgramming.nivel === 0) {
                Client.setProgress(matricula?.progress);
                CourseProgramming.setNivel(matricula?.nivel);

            }

            Object.keys(CourseProgramming.dataNivel)
                .filter(key => key !== "assunto")
                .forEach(key => {
                    if (CourseProgramming.nivel !== nivel) {
                        updatedModuleStates[key] = "success";
                    } else {

                        if (Client.progress === "conclued") {
                            updatedModuleStates[key] = "success";
                        } else if (Client.progress === "selo") {
                            updatedModuleStates[key] = key === "selo" ? "open" : "success";
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
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    CourseProgramming.setNivel(0);
                    Client.setProgress("");
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
                <View style={styles.container}>
                    {/* Your other view code */}
                </View>
                {Object.keys(data_nivel)
                    .filter(key => key !== "assunto")
                    .map(key => (
                        <TouchableOpacity key={key} onPress={() => handleCardPress()}>
                            <CardCourse
                                height={70}
                                width={333}
                                aula={moduleStates[key]}
                                redirect={moduleStates[key] === "success" ? "NivelOneView" : "NivelOne"}
                                data_nivel={{ key: key_course, data: data_nivel, name_curso: name_curso, key_nivel: key }}
                                title={key === "selo" ? "Selo" : "Aula " + key.slice(-2)}
                            />
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </>
    );
});

export default Aulas;
