import React, { useEffect, useRef, useState } from 'react';

import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import Navbar from '../components/navBar/navBar';
import styles from '../onboard/styles/style';
import * as Progress from 'react-native-progress';
import { observer } from 'mobx-react-lite';
import Cliente from '../store/cliente';
import RouterApi from '../../utils/router_api';
import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import { db } from '../../utils/firebase_config';
import CourseProgramming from '../store/course_programming';
import CardCourse from '../components/card-course/card-course';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CourseScreen = observer(() => {


    const [loadingUserData, setLoadingUserData] = useState(true);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const navigation = useNavigation();
    const [error, setError] = useState(null);



    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    setLoadingCourses(true);

                    const data = await RouterApi.get('/aprendev/cursos');
                    const cursosData = data.val() || {};

                    const keys = Object.keys(cursosData).map(key => ({ key }));
                    const cursosArray = Object.keys(cursosData).map(key => cursosData[key]);
                    CourseProgramming.setKeysCourse(keys);
                    CourseProgramming.setCursos(cursosArray);

                    const matriculasQuery = query(ref(db, '/aprendev/matriculas'), orderByChild('uid'), equalTo(Cliente.uid));
                    const matriculasSnapshot = await get(matriculasQuery);

                    if (matriculasSnapshot.exists()) {
                        const matriculasData = matriculasSnapshot.val() || {};
                        const matriculasArray = Object.keys(matriculasData).map(key => matriculasData[key]);
                        CourseProgramming.setMatriculas(matriculasArray);
                    }
                    setLoadingCourses(false);

                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                    setError('Erro ao buscar dados do usuário.');
                    setLoadingCourses(false);
                }
            };

            fetchData();
        }, [Cliente.uid])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Navbar />
            <ScrollView>
                <View>
                    <Text style={styles.title}>Meus Cursos</Text>
                </View>
                {/* {loadingCourses ? (<SkeletonCourse />) : */}

                {CourseProgramming.cursos.map((element, index) => {
                    const key = CourseProgramming.keysCourse[index]?.key || "";
                    const matricula = CourseProgramming.matriculas.find(m => m.uid_course === key);

                    if (matricula?.status === "em andamento") {
                        return (
                            <View key={key}>
                                <View style={customStyles.courseContainer}>
                                    <View style={customStyles.courseTitleContainer}>
                                        <Text style={customStyles.courseTitleText}>{element.curso}</Text>
                                        <Image source={require('../../../assets/Vector.png')} />
                                    </View>
                                </View>
                                <CardCourse
                                    module={matricula?.nivel === 1 ? "open" : matricula?.nivel > 1 ? "success" : "close"}
                                    redirect={"Aulas"}
                                    data_nivel={{ key_course: key, data_nivel: element.nivel_1, name_curso: element.curso, nivel: 1 }}
                                    title={"Nivel 1"}
                                />
                                <CardCourse
                                    module={matricula?.nivel === 2 ? "open" : matricula?.nivel > 2 ? "success" : "close"}
                                    redirect={"Aulas"}
                                    data_nivel={{ key_course: key, data_nivel: element.nivel_2, name_curso: element.curso, nivel: 2 }}
                                    title={"Nivel 2"}
                                />
                                <CardCourse
                                    module={matricula?.nivel === 3 ? "open" : matricula?.nivel > 3 ? "success" : "close"}

                                    redirect={"Aulas"}
                                    data_nivel={{ key_course: key, data_nivel: element.nivel_3, name_curso: element.curso, nivel: 3 }}
                                    title={"Nivel 3"}
                                />
                            </View>
                        );
                    } else {
                        return null;
                    }
                })}

            </ScrollView>
        </SafeAreaView>

    )
})

const customStyles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    courseContainer: {
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20
    },
    courseTitleContainer: {
        backgroundColor: "#CBD5E1",
        flexDirection: "row",
        flex: 1,
        width: 205,
        height: 35,
        margin: 4,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    courseTitleText: {
        textAlign: "center",
        marginRight: 8,
    },
});
export default CourseScreen
