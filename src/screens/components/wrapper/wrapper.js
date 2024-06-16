import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../../home';
import Perfil from '../../../screens/perfil/perfil';
import ConfigScreen from '../../../screens/configuration-screen/config_screen';
import { observer } from 'mobx-react-lite';
import CourseScreen from '../../course/course_screen';
import Client from '../../store/cliente';
import { autorun } from 'mobx';

const Wrapper = observer(() => {
  const Tab = createBottomTabNavigator();

  React.useEffect(() => {
    const dispose = autorun(() => {
      // Trigger re-render
    });

    return () => {
      dispose();
    };
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Cursos"
        options={{
          headerShown: false,
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-sharp" color={color} size={size} />
          ),
        }}
        component={CourseScreen}
      />
      <Tab.Screen
        name="Perfil"
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: size, height: size }} source={{ uri: Client.char }} />
          ),
        }}
        component={Perfil}
      />
      <Tab.Screen
        name='Configuração'
        options={{
          headerShown: false,
          tabBarLabel: 'Configuração',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
        component={ConfigScreen}
      />
    </Tab.Navigator>
  );
});

export default Wrapper;
