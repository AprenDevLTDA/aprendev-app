import React, { useReducer } from 'react'
import { View, Pressable, StyleSheet, ScrollView } from 'react-native'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti'

export default function SkeletonCourse() {
    const dark = useReducer((state) => !state, true)
    const colorMode = dark //'#94A3B8' 

    return (
        <ScrollView>
            <View style={styles.container}>

                <Pressable
                    style={styles.courseButton} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={35} width={205} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>
                <Pressable
                    style={styles.courseButton} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={35} width={205} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>

                <Pressable
                    style={styles.cardCourse} >
                    <MotiView
                        transition={{
                            type: 'timing'
                        }}
                        animate={{ backgroundColor: dark }} >

                        <Skeleton colorMode='dark' radius={8} height={86} width={333} />

                    </MotiView>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },

    courseButton: {
        height: 35,
        borderWidth: 2,
        borderColor: "#FFF",
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden"
    },

    cardCourse: {
        height: 70,
        borderWidth: 2,
        borderColor: "#FFF",
        marginHorizontal: 20,
        marginTop: 3,
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden"
    }

})